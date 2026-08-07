// @ts-check

/**
 * Neuroscience, Unit 4, Act 1: "When the Hardware Fails"
 *
 * Source material: "Unit 4: Understanding Neurological Disorders", section 1,
 * transcribed at content/sources/neuro-unit4-disorders.md.
 *
 * The five causes and five example disorders are quoted from that document and
 * must stay exact.
 *
 * TONE: this act covers real conditions that learners or their families may
 * have. It states mechanisms plainly and never treats a disorder as a puzzle,
 * a failure, or a character flaw. No dramatic framing, no pity.
 *
 * Three of Unit 4's ten official quiz questions live in this act (1, 3, 7).
 * See content/sources/neuro-unit4-quiz-questions.md.
 *
 * Scene ids are namespaced `n4a1-*`. The last scene hands off to `n4a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  ninds: {
    label: "Brain Basics (National Institute of Neurological Disorders and Stroke)",
    url: "https://www.ninds.nih.gov/",
  },
  verywellNeuro: {
    label: "Common Neurological Disorders (Verywell Mind)",
    url: "https://www.verywellmind.com/common-neurological-disorders-5080141",
  },
  mayoMs: {
    label: "Multiple Sclerosis: Treatment (Mayo Clinic)",
    url: "https://www.mayoclinic.org/diseases-conditions/multiple-sclerosis/diagnosis-treatment/drc-20350274",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit4.js. This act
 * awards `mechanism-reader`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "n4a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n4a1-start": {
      id: "n4a1-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 09:00",
      text: [
        "\"Last unit,\" Imani says. \"Neurological disorders are conditions that interfere with how the brain, spinal cord or nerves function. They can affect movement, sensation, memory, emotions or behaviour.\"",
        "\"Some of you will know one of these from a family member. Treat that as an advantage rather than something to set aside: you already know that the person is not the condition. What we're adding is the mechanism.\"",
      ],
      source: SOURCES.ninds,
      xp: 10,
      next: "n4a1-causes-terminal",
    },

    /* ---------------- 2. causes and examples ---------------- */
    "n4a1-causes-terminal": {
      id: "n4a1-causes-terminal",
      type: "terminal",
      title: "ATLAS: causes and conditions",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Five causes, five conditions,\" Imani says. \"They don't map one to one, and the differences are the point.\"",
      ],
      prompt: "Run the reference commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "causes",
          cmd: "disorders --causes",
          output: [
            "WHAT CAUSES NEUROLOGICAL DISORDERS // 5 categories",
            "  Genetic mutations",
            "    Inherited mutations disrupt neuron function. e.g. Huntington's.",
            "  Neurodegeneration",
            "    Progressive damage to neurons. Tremors, memory loss,",
            "    cognitive decline. e.g. Parkinson's, Alzheimer's.",
            "  Autoimmune attacks",
            "    The immune system attacks the body's own tissue. In Multiple",
            "    Sclerosis it attacks protective myelin around nerves.",
            "  Injury or stroke",
            "    Trauma or blocked blood flow permanently damages tissue.",
            "  Infections and toxins",
            "    Certain infections or chemical exposures injure neurons.",
          ],
          required: true,
        },
        {
          id: "examples",
          cmd: "disorders --examples",
          output: [
            "COMMON DISORDERS // 5 entries",
            "  Epilepsy",
            "    Abnormal electrical activity causes repeated seizures.",
            "  Parkinson's Disease",
            "    Loss of dopamine-producing neurons. Tremors, stiffness,",
            "    slow movement.",
            "  Multiple Sclerosis",
            "    Immune-mediated damage to myelin interferes with nerve",
            "    signalling.",
            "  Alzheimer's Disease",
            "    Protein deposits destroy neurons. Memory loss and cognitive",
            "    decline.",
            "  Stroke",
            "    Interrupted blood supply. Can cause paralysis or impaired",
            "    cognition.",
          ],
          required: true,
        },
      ],
      source: SOURCES.verywellNeuro,
      xp: 30,
      next: "n4a1-neurodegenerative-quiz",
    },

    /* ---------------- 3. official quiz Q1 ---------------- */
    "n4a1-neurodegenerative-quiz": {
      id: "n4a1-neurodegenerative-quiz",
      type: "quiz",
      title: "Knowledge check: progressive loss",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Neurodegenerative means a progressive loss of neuron function,\" Imani says. \"Progressive is the operative word: it isn't an event, it's a direction.\"",
      ],
      question: "Which of the following is a neurodegenerative disorder?",
      options: [
        {
          label: "Stroke",
          correct: false,
          feedback:
            "A stroke is an event: blood supply is interrupted and tissue is damaged at that moment. Damaging, but not progressive degeneration.",
        },
        {
          label: "Parkinson's Disease",
          correct: true,
          feedback:
            "Correct. Parkinson's involves the progressive loss of dopamine-producing neurons, causing tremors, stiffness and slow movement. Alzheimer's is the other neurodegenerative condition on the list, where protein deposits destroy neurons over time.",
        },
        {
          label: "Multiple Sclerosis",
          correct: false,
          feedback:
            "MS is autoimmune: the immune system attacks myelin. Damage accumulates, but the cause is an immune attack rather than degeneration of the neurons themselves.",
        },
        {
          label: "Epilepsy",
          correct: false,
          feedback:
            "Epilepsy is caused by abnormal electrical activity producing repeated seizures. It's a signalling problem rather than progressive neuron loss.",
        },
      ],
      source: SOURCES.verywellNeuro,
      xp: 25,
      next: "n4a1-ms-quiz",
    },

    /* ---------------- 4. official quiz Q3 ---------------- */
    "n4a1-ms-quiz": {
      id: "n4a1-ms-quiz",
      type: "quiz",
      title: "Knowledge check: multiple sclerosis",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Myelin is the insulation around a nerve fibre,\" Theo says. \"Strip insulation off a wire and the signal doesn't stop, it degrades.\"",
      ],
      question: "What is the main issue in Multiple Sclerosis (MS)?",
      options: [
        {
          label: "Loss of dopamine-producing neurons",
          correct: false,
          feedback:
            "That's Parkinson's. MS targets the insulation around nerves rather than a specific population of neurons.",
        },
        {
          label: "Immune system attacks myelin, slowing nerve signaling",
          correct: true,
          feedback:
            "Correct. MS is an autoimmune condition: the immune system attacks the protective myelin around nerves, which slows communication between brain and body. That's why symptoms can affect movement, sensation and vision depending on where the damage lands.",
        },
        {
          label: "Protein deposits destroy neurons",
          correct: false,
          feedback:
            "That describes Alzheimer's disease, where protein deposits destroy neurons leading to memory loss and cognitive decline.",
        },
        {
          label: "Abnormal electrical activity in the brain",
          correct: false,
          feedback:
            "That's epilepsy, which causes repeated seizures. MS is an immune attack on myelin.",
        },
      ],
      source: SOURCES.mayoMs,
      xp: 25,
      next: "n4a1-epilepsy-quiz",
    },

    /* ---------------- 5. official quiz Q7 ---------------- */
    "n4a1-epilepsy-quiz": {
      id: "n4a1-epilepsy-quiz",
      type: "quiz",
      title: "Knowledge check: electrical activity",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Neurons communicate electrically as well as chemically,\" Imani says. \"One condition on the list is about that electricity going wrong.\"",
      ],
      question: "Which neurological disorder is caused by abnormal electrical activity in the brain?",
      options: [
        {
          label: "Parkinson's Disease",
          correct: false,
          feedback:
            "Parkinson's comes from the progressive loss of dopamine-producing neurons, not from abnormal electrical activity.",
        },
        {
          label: "Epilepsy",
          correct: true,
          feedback:
            "Correct. Epilepsy is caused by abnormal electrical activity in the brain, producing repeated seizures. Anti-seizure medications work by stabilising that activity, which is why the treatment matches the mechanism so directly.",
        },
        {
          label: "Alzheimer's Disease",
          correct: false,
          feedback:
            "Alzheimer's involves protein deposits destroying neurons, leading to memory loss and cognitive decline.",
        },
        {
          label: "Stroke",
          correct: false,
          feedback:
            "A stroke is an interruption of blood supply to the brain, which can cause paralysis or impaired cognition.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n4a1-mechanism-sort",
    },

    /* ---------------- 6. sort condition to mechanism ---------------- */
    "n4a1-mechanism-sort": {
      id: "n4a1-mechanism-sort",
      type: "sort",
      title: "Match each condition to its mechanism",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Five conditions, four mechanisms,\" Imani says. \"Two of them share one, and knowing which two tells you why they're treated similarly.\"",
      ],
      prompt: "Drag each condition to what's going wrong.",
      buckets: [
        { id: "degeneration", label: "Neurodegeneration", hint: "Progressive neuron loss" },
        { id: "autoimmune", label: "Autoimmune attack", hint: "Immune system on own tissue" },
        { id: "electrical", label: "Abnormal electrical activity", hint: "Signalling misfires" },
        { id: "vascular", label: "Blood supply", hint: "Blocked or interrupted" },
      ],
      items: [
        {
          id: "parkinsons",
          label: "Parkinson's Disease",
          bucket: "degeneration",
          explain: "Progressive loss of dopamine-producing neurons, causing tremors, stiffness and slow movement.",
        },
        {
          id: "alzheimers",
          label: "Alzheimer's Disease",
          bucket: "degeneration",
          explain: "Also neurodegenerative: protein deposits destroy neurons, leading to memory loss and cognitive decline.",
        },
        {
          id: "ms",
          label: "Multiple Sclerosis",
          bucket: "autoimmune",
          explain: "The immune system attacks protective myelin around nerves, slowing communication between brain and body.",
        },
        {
          id: "epilepsy",
          label: "Epilepsy",
          bucket: "electrical",
          explain: "Abnormal electrical activity in the brain causes repeated seizures.",
        },
        {
          id: "stroke",
          label: "Stroke",
          bucket: "vascular",
          explain: "Interruption of blood supply to the brain, which can cause paralysis or impaired cognition.",
        },
      ],
      source: SOURCES.verywellNeuro,
      xp: 35,
      badge: "mechanism-reader",
      next: "n4a1-dossier",
    },

    /* ---------------- 7. dossier ---------------- */
    "n4a1-dossier": {
      id: "n4a1-dossier",
      type: "dossier",
      title: "Lab card: neurological disorders",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"First card,\" Imani says.",
      ],
      terms: [
        {
          term: "Neurological Disorders",
          definition: "Conditions affecting the brain, spinal cord, or peripheral nerves.",
        },
        {
          term: "Neurodegenerative Disease",
          definition: "Progressive loss of neuron function.",
        },
        {
          term: "Neurotransmitters",
          definition: "Chemicals like dopamine and serotonin that transmit signals between neurons.",
        },
        {
          term: "Myelin",
          definition: "The protective sheath around nerves. Damage to it slows signalling between brain and body.",
        },
        {
          term: "Epilepsy",
          definition: "Abnormal electrical activity in the brain causing repeated seizures.",
        },
        {
          term: "Parkinson's Disease",
          definition: "Loss of dopamine-producing neurons, causing tremors, stiffness and slow movement.",
        },
        {
          term: "Multiple Sclerosis",
          definition: "Immune-mediated damage to myelin that interferes with nerve signalling.",
        },
        {
          term: "Alzheimer's Disease",
          definition: "Protein deposits destroy neurons, leading to memory loss and cognitive decline.",
        },
        {
          term: "Stroke",
          definition: "Interruption of blood supply to the brain, which can cause paralysis or impaired cognition.",
        },
      ],
      source: SOURCES.ninds,
      xp: 20,
      next: "n4a1-handoff",
    },

    /* ---------------- 8. handoff to act 2 ---------------- */
    "n4a1-handoff": {
      id: "n4a1-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:10",
      text: [
        "\"Those are conditions where the physical hardware is damaged,\" Imani says. \"Next is the set where the structures are intact and the signalling between them isn't.\"",
        "\"Same brain, same chemicals you learned in Unit 2. Different failure.\"",
      ],
      xp: 15,
      next: "n4a2-start",
    },
  },
};

export default act1;
