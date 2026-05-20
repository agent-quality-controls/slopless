import {
  splitSentences,
  type SplitSentence
} from "../../shared/text/sentences.js";
import { type Token, wordTokens } from "../../shared/text/tokens.js";
import {
  oneToOneRule,
  type LocalDetection
} from "../private/textlint-rule-builders.js";

const RULE_ID = "narrative-slop:attention-redirection";

function wordSet(words: string): ReadonlySet<string> {
  return new Set(words.split(" "));
}

const PERSON_PRONOUNS = wordSet("he i she they we");
const LOOK_VERBS = wordSet("glanced looked stared");

function isCapitalized(token: Token): boolean {
  const first = token.text[0];
  if (first === undefined) {
    return false;
  }

  return (
    first.toLocaleUpperCase("en") === first &&
    first.toLocaleLowerCase("en") !== first
  );
}

function hasPersonToken(token: Token | undefined): boolean {
  return (
    token !== undefined &&
    (PERSON_PRONOUNS.has(token.normalized) || isCapitalized(token))
  );
}

function isEmptyLookAtPerson(sentence: SplitSentence): boolean {
  const tokens = wordTokens(sentence.text);
  return (
    hasPersonToken(tokens[0]) &&
    LOOK_VERBS.has(tokens[1]?.normalized ?? "") &&
    tokens[2]?.normalized === "at" &&
    hasPersonToken(tokens[3]) &&
    tokens[4] === undefined
  );
}

function hasAttentionContrast(sentence: SplitSentence): boolean {
  const words = wordTokens(sentence.text).map((token) => token.normalized);
  const focused = words.indexOf("focused");
  const but = words.indexOf("but");
  const showing = words.indexOf("showing");
  const different = words.indexOf("different");
  const way = words.indexOf("way");

  return (
    focused > 0 &&
    words[focused - 1] === "had" &&
    words[focused + 1] === "on" &&
    but > focused &&
    showing > but &&
    different > showing &&
    way > different
  );
}

function findAttentionRedirection(text: string): LocalDetection | undefined {
  const sentences = splitSentences(text);
  for (let index = 0; index < sentences.length - 1; index += 1) {
    const first = sentences[index];
    const second = sentences[index + 1];
    if (
      first !== undefined &&
      second !== undefined &&
      isEmptyLookAtPerson(first) &&
      hasAttentionContrast(second)
    ) {
      return {
        evidence: text.slice(first.start, second.end),
        label: "attention redirection setup",
        range: { end: second.end, start: first.start }
      };
    }
  }

  return undefined;
}

const rule = oneToOneRule({
  detect: (unit): readonly LocalDetection[] => {
    const match = findAttentionRedirection(unit.text);
    return match === undefined ? [] : [match];
  },
  family: "narrative-slop",
  formatMessage: (report) =>
    `Attention redirection: ${report.detections[0]?.evidence}. Replace the camera/attention setup with the concrete route, clue, or decision.`,
  ruleId: RULE_ID,
  unitKind: "paragraph"
});

export default rule;
