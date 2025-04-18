#!/usr/bin/env node

import { execSync } from "child_process";
import axios from "axios";

const recommendedBranchPrefix = [
  "feature",
  "fix",
  "hotfix",
  "chore",
  "ci",
  "refactor",
  "docs",
  "style",
  "test",
  "main",
  "develop",
  "release",
  "revert",
];

const COLOR_RED = "\x1b[91m";
const COLOR_YELLOW = "\x1b[93m";
const COLOR_BLUE = "\x1b[94m";
const COLOR_RESET = "\x1b[0m";

function getCurrentBranch() {
  try {
    const output = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf8",
    });
    return output.trim();
  } catch (error) {
    throw new Error(`Failed to get current branch: ${error.message}`);
  }
}

function extractBranchInfo(branch) {
  const pattern = /^(\w+)\/(\d+)(?:-.+)?$/;
  const match = branch.match(pattern);

  if (match && match[1] && match[2]) {
    const prefix = match[1];
    const issueNumber = parseInt(match[2], 10);
    if (!isNaN(issueNumber)) {
      return { prefix, issueNumber };
    }
  }
  return { prefix: null, issueNumber: null };
}

async function showIssueInfo(issueId) {
  const url = `https://api.github.com/repos/2504-progate-hanami/exit-prog8/issues/${issueId}`;
  try {
    const response = await axios.get(url);

    const issue = response.data;

    if (issue && issue.number) {
      console.log(
        `${COLOR_BLUE}[INFO]${COLOR_RESET} ISSUE #${issue.number} の情報`,
      );
      console.log("----------");
      console.log(`Issue    : ${issue.number}`);
      console.log(`Title    : ${issue.title}`);
      console.log(`State    : ${issue.state}`);
      console.log(`Created  : ${issue.user?.login || "N/A"}`);

      if (issue.assignees && issue.assignees.length > 0) {
        issue.assignees.forEach((user, index) => {
          const label = index === 0 ? "Assignees:" : "          ";
          console.log(`${label} ${user.login}`);
        });
      } else {
        console.log("Assignees: None");
      }
      console.log("----------");
    } else {
      console.error(
        `${COLOR_RED}[Error] Invalid issue data received.${COLOR_RESET}`,
      );
    }
  } catch (error) {
    if (error.response) {
      console.error(
        `${COLOR_RED}[Error] Issue を正常に取得できませんでした。[StatusCode: ${error.response.status}]${COLOR_RESET}`,
      );
    } else if (error.request) {
      console.error(
        `${COLOR_RED}[Error] 正常にリクエストを送信できませんでした。(No response received)${COLOR_RESET}`,
      );
    } else {
      console.error(
        `${COLOR_RED}[Error] リクエスト設定中にエラーが発生しました: ${error.message}${COLOR_RESET}`,
      );
    }
    console.error(
      `${COLOR_RED}[Error] Failed to fetch or parse issue details.${COLOR_RESET}`,
    );
  }
}

async function main() {
  let currentBranch;
  try {
    currentBranch = getCurrentBranch();
  } catch (error) {
    console.error(
      `${COLOR_RED}[Error] ブランチ名が取得できませんでした。${COLOR_RESET}`,
    );
    console.error(error.message);
    process.exit(1);
  }

  const { prefix, issueNumber } = extractBranchInfo(currentBranch);

  if (!prefix) {
    const basicPattern = /^(\w+)\//;
    const basicMatch = currentBranch.match(basicPattern);
    if (basicMatch && basicMatch[1]) {
      const simplePrefix = basicMatch[1];
      if (!recommendedBranchPrefix.includes(simplePrefix)) {
        console.warn(
          `${COLOR_YELLOW}[WARNING]${COLOR_RESET} ${simplePrefix} は非推奨のPrefixです。`,
        );
      }
      console.warn(
        `${COLOR_YELLOW}[WARNING]${COLOR_RESET} ブランチ名にIssue番号が含まれていないか、形式が正しくありません。`,
      );
      console.warn(
        `${COLOR_YELLOW}[WARNING]${COLOR_RESET} Example: 'feature/1-login-form'`,
      );
    } else {
      console.error(
        `${COLOR_RED}[Error] ブランチ名が命名規則に則っていません。${COLOR_RESET}`,
      );
      console.error(
        `${COLOR_RED}[Error] Example: 'feature/1-login-form'${COLOR_RESET}`,
      );
    }
  } else {
    if (!recommendedBranchPrefix.includes(prefix)) {
      console.warn(
        `${COLOR_YELLOW}[WARNING]${COLOR_RESET} ${prefix} は非推奨のPrefixです。`,
      );
    }

    if (issueNumber !== null && issueNumber > 0) {
      await showIssueInfo(issueNumber);
    } else {
      console.warn(
        `${COLOR_YELLOW}[WARNING]${COLOR_RESET} Issue番号がブランチ名から抽出できませんでした。`,
      );
    }
  }
}

main().catch((error) => {
  console.error(
    `${COLOR_RED}[FATAL ERROR]${COLOR_RESET} An unexpected error occurred:`,
    error,
  );
  process.exit(1);
});
