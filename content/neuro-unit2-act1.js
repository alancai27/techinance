// @ts-check

/**
 * Neuroscience, Unit 2, Act 1: "The Three Structures"
 *
 * Source material: "Unit 2: The Neuroscience Behind Emotions", section 1,
 * transcribed at content/sources/neuro-unit2-emotions.md.
 *
 * Facts quoted here come from that document and must stay exact:
 *   the amygdala matures earlier than the prefrontal cortex, which is why
 *   teenage emotional intensity is heightened,
 *   the uncinate fasciculus connects the amygdala and hippocampus to the
 *   orbitofrontal cortex,
 *   people with high emotional intelligence show increased prefrontal activity.
 *
 * Four of Unit 2's ten official quiz questions live in this act (1, 2, 3, 10).
 * Wording, option order and correct answer are fixed by the form. See
 * content/sources/neuro-unit2-quiz-questions.md.
 *
 * Scene ids are namespaced `n2a1-*`. The last scene hands off to `n2a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  keyRoles: {
    label: "Amygdala, Hippocampus, and Prefrontal Cortex: Key Roles (Biology Insights)",
    url: "https://biologyinsights.com/amygdala-hippocampus-and-prefrontal-cortex-key-roles/",
  },
  ensembles: {
    label: "Neuronal Ensembles in Amygdala, Hippocampus, and Prefrontal Cortex (J Neurosci)",
    url: "https://www.jneurosci.org/content/34/25/8462",
  },
  ambiguity: {
    label: "Amygdala and prefrontal connectivity in emotion ambiguity (Nature)",
    url: "https://www.nature.com/articles/s41398-023-02625-w.pdf",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit2.js. This act
 * awards `circuit-reader`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "n2a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n2a1-start": {
      id: "n2a1-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 09:00",
      text: [
        "\"Last unit you learned the map. This unit you'll watch three parts of it argue with each other,\" Imani says.",
        "\"Emotion isn't one process. It's a fast system and a slow system running at the same time, plus a memory system telling both of them what happened last time. The amygdala, the prefrontal cortex, and the hippocampus.\"",
        "\"You met all three already. What you haven't seen is how they interact under pressure.\"",
      ],
      source: SOURCES.keyRoles,
      xp: 10,
      next: "n2a1-fear-quiz",
    },

    /* ---------------- 2. official quiz Q1 ---------------- */
    "n2a1-fear-quiz": {
      id: "n2a1-fear-quiz",
      type: "quiz",
      title: "Knowledge check: the alarm",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Start with the fastest of the three,\" Imani says. \"It interprets sensory information often before your conscious mind registers it.\"",
      ],
      question: "Which brain structure is most involved in processing fear?",
      options: [
        {
          label: "Hippocampus",
          correct: false,
          feedback:
            "The hippocampus supplies the context around a fear, like where it happened, but the alarm itself is raised elsewhere.",
        },
        {
          label: "Amygdala",
          correct: true,
          feedback:
            "Correct. The amygdala is central to immediate emotional reactions, especially assessing threats. It reads sensory information before conscious awareness catches up, then triggers physiological arousal, memory and motor systems so the body can respond in real time.",
        },
        {
          label: "Prefrontal Cortex",
          correct: false,
          feedback:
            "The prefrontal cortex regulates emotion rather than generating it. It's the slow, deliberate half of the system.",
        },
        {
          label: "Thalamus",
          correct: false,
          feedback:
            "The thalamus is the sensory relay from Unit 1. It routes signals; the amygdala decides whether they're threatening.",
        },
      ],
      source: SOURCES.keyRoles,
      xp: 25,
      next: "n2a1-memory-quiz",
    },

    /* ---------------- 3. official quiz Q2 ---------------- */
    "n2a1-memory-quiz": {
      id: "n2a1-memory-quiz",
      type: "quiz",
      title: "Knowledge check: what makes emotion informed",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Remembering a barking dog is why you're careful the next time you meet one,\" Theo says. \"That's not the amygdala on its own.\"",
      ],
      question: "The hippocampus is primarily responsible for:",
      options: [
        {
          label: "Regulating heartbeat",
          correct: false,
          feedback:
            "Heart rate is a brainstem job, one of the basic life functions from Unit 1.",
        },
        {
          label: "Controlling balace",
          correct: false,
          feedback:
            "Balance belongs to the cerebellum. The hippocampus deals in memory. (The form spells this option \"balace\".)",
        },
        {
          label: "Releasing dopamine",
          correct: false,
          feedback:
            "Dopamine comes up in the next act. The hippocampus stores rather than signals.",
        },
        {
          label: "Long term memory formation",
          correct: true,
          feedback:
            "Correct. The hippocampus encodes details of events, including time, place and environmental cues, so emotional memories can guide future behaviour. That's what stops emotion being purely reactive: it arrives with context attached.",
        },
      ],
      source: SOURCES.ensembles,
      xp: 25,
      next: "n2a1-pfc-quiz",
    },

    /* ---------------- 4. official quiz Q3 ---------------- */
    "n2a1-pfc-quiz": {
      id: "n2a1-pfc-quiz",
      type: "quiz",
      title: "Knowledge check: the brake",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Feeling anger during a disagreement and not acting on it is a specific piece of machinery,\" Imani says.",
      ],
      question: "The prefrontal cortex plays a major role in:",
      options: [
        {
          label: "Decision making and emotion regulation",
          correct: true,
          feedback:
            "Correct. The PFC handles planning, evaluation, inhibition and modulation of emotional impulses. It's what lets you pause, weigh consequences, and choose a considered response over a reflexive one. Repeated use makes it better at damping excessive reactivity.",
        },
        {
          label: "Smell recognition",
          correct: false,
          feedback:
            "Smell is the olfactory bulb, and the one sense that bypasses the thalamus. The PFC is the regulator.",
        },
        {
          label: "Visual processing",
          correct: false,
          feedback:
            "Vision is the occipital lobe from Unit 1. The prefrontal cortex sits at the front and governs decisions.",
        },
        {
          label: "Motor control",
          correct: false,
          feedback:
            "Movement isn't the PFC's job. It plans, evaluates, inhibits and modulates emotional impulses.",
        },
      ],
      source: SOURCES.keyRoles,
      xp: 25,
      next: "n2a1-network-terminal",
    },

    /* ---------------- 5. the wiring ---------------- */
    "n2a1-network-terminal": {
      id: "n2a1-network-terminal",
      type: "terminal",
      title: "ATLAS: emotional network",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Pull the connectivity map,\" Imani says. \"Three structures is the easy part. What they're wired to is where it gets interesting.\"",
      ],
      prompt: "Run the network commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "roles",
          cmd: "network --roles",
          output: [
            "EMOTIONAL NETWORK // 3 nodes",
            "  Amygdala",
            "    Threat detection. Rapid, implicit, pre-conscious.",
            "    Outputs to arousal, memory and motor systems.",
            "  Hippocampus",
            "    Emotional memory. Encodes time, place, environmental cues.",
            "    Supplies context so responses are adaptive, not blind.",
            "  Prefrontal cortex",
            "    Top-down control. Planning, evaluation, inhibition.",
            "    Explicit, slow, improves with repeated engagement.",
          ],
          required: true,
        },
        {
          id: "tracts",
          cmd: "network --tracts",
          output: [
            "STRUCTURAL CONNECTIONS",
            "  uncinate fasciculus",
            "    Connects the amygdala and hippocampus to the orbitofrontal",
            "    cortex. Critical for modulating emotional response.",
            "",
            "  DEVELOPMENTAL NOTE",
            "    The amygdala matures earlier than the prefrontal cortex.",
            "    Alarm system online before the brake is finished, which is",
            "    why teenage emotional intensity is heightened.",
            "",
            "  Individuals with high emotional intelligence show increased",
            "  activity in the prefrontal cortex.",
          ],
          required: true,
        },
      ],
      source: SOURCES.ambiguity,
      xp: 30,
      next: "n2a1-timing-reveal",
    },

    /* ---------------- 6. why teenagers ---------------- */
    "n2a1-timing-reveal": {
      id: "n2a1-timing-reveal",
      type: "reveal",
      title: "Which one finishes growing first",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Here's the fact that explains most of adolescence,\" Theo says. \"Two structures, and they don't finish developing at the same time. Which one is ready first?\"",
      ],
      question: "Which matures earlier, the amygdala or the prefrontal cortex?",
      options: [
        "The prefrontal cortex, by several years",
        "The amygdala",
        "They finish at the same time",
        "Neither finishes developing",
      ],
      answerIndex: 1,
      value: "The amygdala",
      caption: "The amygdala matures earlier than the prefrontal cortex.",
      explain:
        "The amygdala matures earlier than the prefrontal cortex. The alarm system is fully online while the brake is still being built, which is why teenage emotional intensity is heightened. It's a developmental timing gap, not a character flaw, and it closes on its own. Unit 1 put full prefrontal development at around age 25.",
      source: SOURCES.keyRoles,
      xp: 25,
      next: "n2a1-network-sort",
    },

    /* ---------------- 7. sort the roles ---------------- */
    "n2a1-network-sort": {
      id: "n2a1-network-sort",
      type: "sort",
      title: "Which structure is doing this?",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Six things happening during one emotional moment,\" Imani says. \"Assign each to the structure responsible.\"",
      ],
      prompt: "Drag each job to the structure that does it.",
      buckets: [
        { id: "amygdala", label: "Amygdala", hint: "Fast and implicit" },
        { id: "hippocampus", label: "Hippocampus", hint: "Memory and context" },
        { id: "pfc", label: "Prefrontal cortex", hint: "Slow and deliberate" },
      ],
      items: [
        {
          id: "threat",
          label: "Detecting a threat before you consciously notice it",
          bucket: "amygdala",
          explain: "The amygdala interprets sensory information often before the conscious mind registers it. Speed is the whole point of it.",
        },
        {
          id: "arousal",
          label: "Triggering physical arousal so the body can react",
          bucket: "amygdala",
          explain: "Amygdala outputs activate systems governing physiological arousal, memory and motor action.",
        },
        {
          id: "context",
          label: "Recalling where something similar happened before",
          bucket: "hippocampus",
          explain: "The hippocampus encodes time, place and environmental cues, so past experience informs the present reaction.",
        },
        {
          id: "encode",
          label: "Storing this event so it guides you next time",
          bucket: "hippocampus",
          explain: "Emotional memory is the hippocampus's contribution: it makes responses adaptive rather than purely reflexive.",
        },
        {
          id: "pause",
          label: "Pausing to consider consequences before reacting",
          bucket: "pfc",
          explain: "Top-down control from the prefrontal cortex. Planning, evaluation and inhibition of emotional impulses.",
        },
        {
          id: "choose",
          label: "Choosing a measured response over a reflexive one",
          bucket: "pfc",
          explain: "Also the PFC, and it improves with repeated engagement. Emotional maturity is partly this pathway getting more practice.",
        },
      ],
      source: SOURCES.keyRoles,
      xp: 35,
      badge: "circuit-reader",
      next: "n2a1-dominance-quiz",
    },

    /* ---------------- 8. official quiz Q10 ---------------- */
    "n2a1-dominance-quiz": {
      id: "n2a1-dominance-quiz",
      type: "quiz",
      title: "Knowledge check: which system moves first",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Order matters here,\" Imani says. \"Emotion is generated first and regulated second, never the other way round.\"",
      ],
      question: "In emotion generation, which part of the brain is dominant before regulation takes place?",
      options: [
        {
          label: "Brainstem nuclei",
          correct: false,
          feedback:
            "The brainstem runs basic life functions like breathing and heart rate. It's involved in arousal but isn't what generates the emotional response.",
        },
        {
          label: "Cortical structures like the PFC",
          correct: false,
          feedback:
            "The PFC is the regulator, so by definition it acts after generation. That's the distinction this question is testing.",
        },
        {
          label: "Subcortical structures like the amygdala",
          correct: true,
          feedback:
            "Correct. Emotion is generated by subcortical structures, the amygdala foremost, before cortical regulation gets involved. The amygdala responds before conscious awareness, which is why you feel something and then decide what to do about it.",
        },
        {
          label: "Occipital lobe",
          correct: false,
          feedback:
            "The occipital lobe handles vision. It might deliver the image that triggers a reaction, but the reaction itself is subcortical.",
        },
      ],
      source: SOURCES.ambiguity,
      xp: 25,
      next: "n2a1-dossier",
    },

    /* ---------------- 9. dossier ---------------- */
    "n2a1-dossier": {
      id: "n2a1-dossier",
      type: "dossier",
      title: "Lab card: the emotional network",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"First card of the unit,\" Imani says.",
      ],
      terms: [
        { term: "Amygdala", definition: "Brain structure that processes fear and threat signals." },
        { term: "Hippocampus", definition: "Region involved in forming and retrieving emotional memories." },
        {
          term: "Prefrontal Cortex",
          definition: "Frontal brain area responsible for regulating emotions and impulse control.",
        },
        { term: "Emotional Network", definition: "Interconnected brain regions involved in emotion generation." },
        { term: "Threat Detection", definition: "Rapid evaluation of potential danger by the amygdala." },
        { term: "Emotional Memory", definition: "Memory encoded with emotional significance." },
        { term: "Top-down Control", definition: "Cognitive regulation from higher-level brain areas." },
        { term: "Functional Connectivity", definition: "Communication pathways between brain regions." },
        { term: "Limbic System", definition: "Network of brain regions involved in emotion." },
        { term: "Emotional Regulation", definition: "Modulation of emotional responses via neural control." },
      ],
      source: SOURCES.keyRoles,
      xp: 20,
      next: "n2a1-handoff",
    },

    /* ---------------- 10. handoff to act 2 ---------------- */
    "n2a1-handoff": {
      id: "n2a1-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:15",
      text: [
        "\"That's the circuitry,\" Imani says. \"But circuits and firing rates aren't the whole story. Emotion is chemical as well as structural.\"",
        "\"Five molecules do most of the work, and the balance between two of them decides whether you can feel something without being flattened by it.\"",
      ],
      xp: 15,
      next: "n2a2-start",
    },
  },
};

export default act1;
