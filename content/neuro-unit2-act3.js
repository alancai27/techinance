// @ts-check

/**
 * Neuroscience, Unit 2, Act 3: "Changing the Response"
 *
 * Source material: "Unit 2: The Neuroscience Behind Emotions", section 3,
 * transcribed at content/sources/neuro-unit2-emotions.md.
 *
 * Facts quoted here come from that document and must stay exact:
 *   reappraisal engages frontoparietal control regions more strongly than
 *   self-distancing or distraction,
 *   reappraisal shows the least increased brain activation as emotion
 *   intensity rises, indicating efficiency,
 *   mindfulness strengthens connections between prefrontal areas and the
 *   amygdala.
 *
 * Two of Unit 2's ten official quiz questions live in this act (7 and 8).
 *
 * The session transcript in the inspect scene is fictional. Every flagged line
 * is one of the regulation strategies or failure modes named in the source.
 *
 * Scene ids are namespaced `n2a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  metaAnalysis: {
    label: "Amygdala-prefrontal connectivity during emotion regulation: a meta-analysis (ScienceDirect)",
    url: "https://www.sciencedirect.com/science/article/pii/S002839322100018X",
  },
  ambiguity: {
    label: "Amygdala and prefrontal connectivity in emotion ambiguity (Nature)",
    url: "https://www.nature.com/articles/s41398-023-02625-w.pdf",
  },
  keyRoles: {
    label: "Amygdala, Hippocampus, and Prefrontal Cortex: Key Roles (Biology Insights)",
    url: "https://biologyinsights.com/amygdala-hippocampus-and-prefrontal-cortex-key-roles/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit2.js. This act
 * awards `neuro-unit2-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "n2a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n2a3-start": {
      id: "n2a3-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:25",
      text: [
        "\"Emotional regulation means altering which emotions you experience and how you express them,\" Imani says. \"Not suppressing them. Altering them.\"",
        "\"And it works because of neuroplasticity, which you met in Unit 1. The brain adapts through experience and training, so a pathway you use often gets easier to use.\"",
      ],
      source: SOURCES.metaAnalysis,
      xp: 10,
      next: "n2a3-pathway-quiz",
    },

    /* ---------------- 2. official quiz Q7 ---------------- */
    "n2a3-pathway-quiz": {
      id: "n2a3-pathway-quiz",
      type: "quiz",
      title: "Knowledge check: the regulating connection",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Regulation isn't one structure. It's a connection between two of them,\" Imani says. \"Which two?\"",
      ],
      question: "Which brain pathway is crucial for regulating emotions?",
      options: [
        {
          label: "Amygdala-hippocampus connection",
          correct: false,
          feedback:
            "That link supplies emotional memory, giving a reaction its context. Useful, but it informs the response rather than regulating it.",
        },
        {
          label: "Hippocampus-thalamus loop",
          correct: false,
          feedback:
            "The thalamus is the sensory relay from Unit 1. It routes incoming signals rather than moderating emotional output.",
        },
        {
          label: "Amygdala-prefrontal cortex connectivity",
          correct: true,
          feedback:
            "Correct. The amygdala generates and the prefrontal cortex regulates, so the connection between them is where regulation actually happens. The uncinate fasciculus carries part of this, linking the amygdala and hippocampus to the orbitofrontal cortex.",
        },
        {
          label: "Cerebellum-motor cortex pathway",
          correct: false,
          feedback:
            "That's a movement pathway. Emotion regulation runs between the structure that raises the alarm and the one that can override it.",
        },
      ],
      source: SOURCES.ambiguity,
      xp: 25,
      next: "n2a3-methods-terminal",
    },

    /* ---------------- 3. the techniques ---------------- */
    "n2a3-methods-terminal": {
      id: "n2a3-methods-terminal",
      type: "terminal",
      title: "ATLAS: regulation strategies",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Four approaches, and imaging can tell them apart,\" Imani says. \"Pull both files.\"",
      ],
      prompt: "Run the strategy commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "cognitive",
          cmd: "regulate --info reappraisal mindfulness",
          output: [
            "COGNITIVE REAPPRAISAL",
            "  Reframing how an emotionally charged situation is interpreted.",
            "  'I messed up' becomes 'I learned from that'.",
            "  Imaging: consistently activates prefrontal regions, including",
            "  the ventrolateral PFC. Engages executive resources to modify",
            "  the emotional response.",
            "",
            "MINDFULNESS",
            "  Present-moment, nonjudgmental awareness of thoughts and",
            "  emotions. Observe the feeling without reacting to it.",
            "  Imaging: strengthens functional connections between prefrontal",
            "  areas and emotion-generating regions like the amygdala.",
          ],
          required: true,
        },
        {
          id: "therapies",
          cmd: "regulate --info act dbt",
          output: [
            "ACT (ACCEPTANCE AND COMMITMENT THERAPY)",
            "  Encourages emotional openness rather than avoidance.",
            "  Boosts activity in networks related to self-awareness and",
            "  acceptance.",
            "",
            "DBT (DIALECTICAL BEHAVIOR THERAPY)",
            "  Teaches distress tolerance and interpersonal effectiveness.",
            "  Enhances the capacity of prefrontal control regions to manage",
            "  emotional arousal.",
            "",
            "  All four rely on neuroplasticity: the brain adapts through",
            "  experience and training.",
          ],
          required: true,
        },
      ],
      source: SOURCES.metaAnalysis,
      xp: 30,
      next: "n2a3-mindfulness-quiz",
    },

    /* ---------------- 4. official quiz Q8 ---------------- */
    "n2a3-mindfulness-quiz": {
      id: "n2a3-mindfulness-quiz",
      type: "quiz",
      title: "Knowledge check: what mindfulness changes",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Mindfulness gets talked about loosely,\" Theo says. \"Imaging shows something specific.\"",
      ],
      question: "Mindfulness can improve emotional regulation by:",
      options: [
        {
          label: "Shrinking the hippocampus",
          correct: false,
          feedback:
            "Hippocampal shrinkage is what chronic stress does, from Unit 1. Mindfulness works in the opposite direction.",
        },
        {
          label: "Increasing cortisol levels",
          correct: false,
          feedback:
            "Raising a stress hormone would work against regulation. Mindfulness changes connectivity, not stress chemistry directly.",
        },
        {
          label: "Weakening dopamine release",
          correct: false,
          feedback:
            "Dopamine is reward and motivation. Mindfulness isn't about suppressing it; it's about strengthening a connection.",
        },
        {
          label: "Strengthening the prefrontal-amygdala pathways",
          correct: true,
          feedback:
            "Correct. Mindfulness strengthens functional connections between prefrontal areas and emotion-generating regions like the amygdala. That makes it easier to notice an emotion rising and respond thoughtfully instead of impulsively.",
        },
      ],
      source: SOURCES.metaAnalysis,
      xp: 25,
      next: "n2a3-efficiency-reveal",
    },

    /* ---------------- 5. which technique is most efficient ---------------- */
    "n2a3-efficiency-reveal": {
      id: "n2a3-efficiency-reveal",
      type: "reveal",
      title: "Which strategy scales best",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Here's a finding people find counterintuitive,\" Imani says. \"As an emotion gets more intense, which technique needs the least extra brain activation to keep working?\"",
      ],
      question: "Which regulation strategy shows the least increased activation as emotion intensity rises?",
      options: ["Distraction", "Self-distancing", "Cognitive reappraisal", "Suppression"],
      answerIndex: 2,
      value: "Reappraisal",
      caption: "Reappraisal shows the least increased activation as emotion intensity rises.",
      explain:
        "Cognitive reappraisal shows the least increased brain activation as emotion intensity increases, which indicates efficiency: it doesn't cost proportionally more to use on a stronger feeling. It also engages frontoparietal control regions more strongly than self-distancing or distraction.",
      source: SOURCES.metaAnalysis,
      xp: 25,
      next: "n2a3-session-inspect",
    },

    /* ---------------- 6. read the session ---------------- */
    "n2a3-session-inspect": {
      id: "n2a3-session-inspect",
      type: "inspect",
      title: "Review the transcript: which line is regulation?",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Workstation 3",
      text: [
        "\"A practice transcript,\" Imani says. \"A participant describing a bad week. Tap the lines where they're actually regulating, rather than just describing or avoiding.\"",
      ],
      prompt: "Tap the lines that show a real regulation strategy. Find at least 4.",
      artifact: {
        kind: "report",
        fields: [
          { label: "Session", value: "Practice transcript, participant 12", hot: "session" },
          { label: "Topic", value: "A presentation that went badly", hot: "topic" },
        ],
        body: [
          "PARTICIPANT",
          "\"I completely fell apart in front of everyone.\"",
          {
            hot: "reappraisal",
            text: "\"Actually, rethinking it: I got through it and I know exactly what to fix next time.\"",
          },
          "\"I keep replaying the moment I lost my place.\"",
          {
            hot: "mindfulness",
            text: "\"I noticed the panic starting this morning and just watched it, without deciding it meant anything.\"",
          },
          {
            hot: "distancing",
            text: "\"When I picture it as if I'm watching someone else, it stops feeling so enormous.\"",
          },
          "\"I've been avoiding the group chat since it happened.\"",
          {
            hot: "acceptance",
            text: "\"I've stopped arguing with the feeling. It's there, and I can still go to the next session.\"",
          },
          {
            hot: "tolerance",
            text: "\"When it peaks I use the breathing thing to ride it out instead of leaving the room.\"",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        session: {
          suspicious: false,
          explain: "Header information. Nothing to read into it.",
        },
        topic: {
          suspicious: false,
          explain: "The subject of the session, not a strategy in itself.",
        },
        reappraisal: {
          suspicious: true,
          explain: "Cognitive reappraisal: reframing the interpretation, exactly the 'I messed up' to 'I learned from that' move. It activates prefrontal regions including the ventrolateral PFC, and it's the most efficient technique as intensity rises.",
        },
        mindfulness: {
          suspicious: true,
          explain: "Mindfulness: present-moment, nonjudgmental awareness. Observing the feeling without reacting is what strengthens prefrontal-amygdala connections over time.",
        },
        distancing: {
          suspicious: true,
          explain: "Self-distancing: viewing the situation objectively to reduce emotional intensity. It works, though reappraisal engages frontoparietal control regions more strongly.",
        },
        acceptance: {
          suspicious: true,
          explain: "Acceptance, the core of ACT. Emotional openness rather than avoidance, which boosts activity in networks related to self-awareness and acceptance.",
        },
        tolerance: {
          suspicious: true,
          explain: "Distress tolerance, a DBT skill. It enhances the capacity of prefrontal control regions to manage emotional arousal, and note that it's staying with the feeling rather than escaping it.",
        },
      },
      source: SOURCES.metaAnalysis,
      xp: 40,
      next: "n2a3-dossier",
    },

    /* ---------------- 7. dossier ---------------- */
    "n2a3-dossier": {
      id: "n2a3-dossier",
      type: "dossier",
      title: "Lab card: emotional regulation",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Last card of the unit,\" Imani says.",
      ],
      terms: [
        {
          term: "Emotional Regulation",
          definition: "Altering which emotions we experience and how we express them.",
        },
        { term: "Mindfulness", definition: "Non-judgmental present-moment awareness technique." },
        {
          term: "Cognitive Reappraisal",
          definition: "Changing interpretation to alter emotional response.",
        },
        {
          term: "ACT (Acceptance and Commitment Therapy)",
          definition: "Therapeutic approach for emotional flexibility.",
        },
        {
          term: "DBT (Dialectical Behavior Therapy)",
          definition: "Therapy focusing on regulating emotions and behavior.",
        },
        {
          term: "Frontoparietal Control Network",
          definition: "Brain circuit for executive regulation.",
        },
        {
          term: "Self-distancing",
          definition: "Viewing situations objectively to reduce emotional intensity.",
        },
        { term: "Distraction", definition: "Shifting attention away from emotion-triggering stimuli." },
        {
          term: "Emotion Dysregulation",
          definition: "Inability to manage emotional responses adequately.",
        },
        {
          term: "Neuroplasticity",
          definition: "Brain's ability to adapt through experience and training.",
        },
      ],
      source: SOURCES.keyRoles,
      xp: 20,
      next: "n2a3-practice-choice",
    },

    /* ---------------- 8. applying it ---------------- */
    "n2a3-practice-choice": {
      id: "n2a3-practice-choice",
      type: "choice",
      title: "What to recommend",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab, 12:10",
      text: [
        "\"A sixteen-year-old in the study says they get overwhelmed and can't think straight in the moment,\" Theo says.",
        "\"Based on this unit, what's worth suggesting?\"",
      ],
      prompt: "Pick the response the evidence supports.",
      options: [
        {
          label: "Practise reappraisal and mindfulness regularly, so the prefrontal-amygdala pathway is stronger before it's needed.",
          next: "n2a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. These work through neuroplasticity, so they're built in advance rather than summoned on demand. Mindfulness strengthens prefrontal-amygdala connections and reappraisal stays efficient as intensity rises. And at sixteen the amygdala has matured ahead of the prefrontal cortex, which makes the practice more useful, not less.",
        },
        {
          label: "Tell them to stop feeling overwhelmed and push the emotion down when it appears.",
          next: "n2a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Regulation means altering which emotions you experience and how you express them, not suppressing them. Every technique here works with the feeling rather than against it: reappraisal reinterprets, mindfulness observes, ACT accepts, DBT tolerates.",
        },
        {
          label: "Nothing will help until the prefrontal cortex finishes developing at around 25.",
          next: "n2a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "The developmental gap is real, but the brain adapts through experience and training at any age. Waiting a decade wastes the years when the practice would compound most.",
        },
      ],
      source: SOURCES.ambiguity,
    },

    /* ---------------- 9. ending ---------------- */
    "n2a3-ending": {
      id: "n2a3-ending",
      type: "ending",
      title: "Unit 2 complete",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 12:25",
      text: [
        "\"Three structures generating and moderating, five chemicals setting the tone, and a set of techniques that change the connection between them,\" Imani says. \"That's emotion, as far as we can currently measure it.\"",
        "\"The part worth carrying: the amygdala moves first and the prefrontal cortex moves second. You don't get to choose the first reaction. You do get to train what happens next.\"",
        "Theo is already labelling samples for the next study. \"Unit 3,\" he says. \"Dopamine again, except this time something else is pulling the lever.\"",
      ],
      xp: 20,
      badge: "neuro-unit2-certified",
      next: null,
    },
  },
};

export default act3;
