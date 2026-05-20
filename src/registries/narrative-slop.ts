import attentionRedirection from "../rules/narrative-slop/attention-redirection.js";
import bodyActionDensity from "../rules/narrative-slop/body-action-density.js";
import emptyBeat from "../rules/narrative-slop/empty-beat.js";
import emotionTelling from "../rules/narrative-slop/emotion-telling.js";
import flatActionCadence from "../rules/narrative-slop/flat-action-cadence.js";
import lowInformationBeatDensity from "../rules/narrative-slop/low-information-beat-density.js";
import narrativeCliches from "../rules/narrative-slop/narrative-cliches.js";
import perceptionVerbDensity from "../rules/narrative-slop/perception-verb-density.js";

export const narrativeSlopRules = {
  "attention-redirection": attentionRedirection,
  "body-action-density": bodyActionDensity,
  "empty-beat": emptyBeat,
  "emotion-telling": emotionTelling,
  "flat-action-cadence": flatActionCadence,
  "low-information-beat-density": lowInformationBeatDensity,
  "perception-verb-density": perceptionVerbDensity,
  "narrative-cliches": narrativeCliches
};
