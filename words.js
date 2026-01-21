/**
 * 英単語データ
 * 基本的な英単語50語（日常会話・ビジネス・学習向け）をベースに
 * 辞書データの追加単語で6000語以上に拡張して提供
 */
const BASE_WORDS = [
  {
    id: 1,
    word: "accomplish",
    meaning: "達成する、成し遂げる",
    example: "She accomplished her goal of running a marathon."
  },
  {
    id: 2,
    word: "acknowledge",
    meaning: "認める、承認する",
    example: "He acknowledged his mistake and apologized."
  },
  {
    id: 3,
    word: "acquire",
    meaning: "取得する、習得する",
    example: "It takes time to acquire a new language."
  },
  {
    id: 4,
    word: "adapt",
    meaning: "適応する、順応する",
    example: "We need to adapt to the changing environment."
  },
  {
    id: 5,
    word: "adequate",
    meaning: "適切な、十分な",
    example: "Make sure you get adequate sleep every night."
  },
  {
    id: 6,
    word: "anticipate",
    meaning: "予期する、期待する",
    example: "We anticipate strong demand for the new product."
  },
  {
    id: 7,
    word: "apparent",
    meaning: "明らかな、明白な",
    example: "It was apparent that she was nervous."
  },
  {
    id: 8,
    word: "appreciate",
    meaning: "感謝する、正しく評価する",
    example: "I really appreciate your help."
  },
  {
    id: 9,
    word: "approach",
    meaning: "接近する、取り組む",
    example: "Let's approach this problem differently."
  },
  {
    id: 10,
    word: "appropriate",
    meaning: "適切な、ふさわしい",
    example: "Casual clothes are not appropriate for the meeting."
  },
  {
    id: 11,
    word: "assume",
    meaning: "仮定する、思い込む",
    example: "Don't assume you know everything."
  },
  {
    id: 12,
    word: "benefit",
    meaning: "利益、恩恵",
    example: "Exercise has many health benefits."
  },
  {
    id: 13,
    word: "circumstance",
    meaning: "状況、事情",
    example: "Under no circumstance should you give up."
  },
  {
    id: 14,
    word: "collaborate",
    meaning: "協力する、共同作業する",
    example: "We need to collaborate with other teams."
  },
  {
    id: 15,
    word: "commit",
    meaning: "約束する、専念する",
    example: "I commit to finishing this project on time."
  },
  {
    id: 16,
    word: "comprehensive",
    meaning: "包括的な、総合的な",
    example: "We need a comprehensive plan."
  },
  {
    id: 17,
    word: "conclude",
    meaning: "結論を出す、終える",
    example: "We can conclude that the experiment was successful."
  },
  {
    id: 18,
    word: "consequence",
    meaning: "結果、影響",
    example: "Consider the consequences of your actions."
  },
  {
    id: 19,
    word: "consistent",
    meaning: "一貫した、一致した",
    example: "Be consistent in your efforts."
  },
  {
    id: 20,
    word: "contribute",
    meaning: "貢献する、寄付する",
    example: "Everyone should contribute to the discussion."
  },
  {
    id: 21,
    word: "crucial",
    meaning: "重大な、決定的な",
    example: "Timing is crucial in this business."
  },
  {
    id: 22,
    word: "demonstrate",
    meaning: "実演する、証明する",
    example: "Let me demonstrate how it works."
  },
  {
    id: 23,
    word: "derive",
    meaning: "引き出す、由来する",
    example: "This word derives from Latin."
  },
  {
    id: 24,
    word: "determine",
    meaning: "決定する、特定する",
    example: "We need to determine the cause of the problem."
  },
  {
    id: 25,
    word: "efficient",
    meaning: "効率的な、有能な",
    example: "We need a more efficient system."
  },
  {
    id: 26,
    word: "emphasize",
    meaning: "強調する、重視する",
    example: "I want to emphasize the importance of safety."
  },
  {
    id: 27,
    word: "enhance",
    meaning: "高める、向上させる",
    example: "This tool will enhance your productivity."
  },
  {
    id: 28,
    word: "establish",
    meaning: "設立する、確立する",
    example: "We need to establish clear guidelines."
  },
  {
    id: 29,
    word: "evaluate",
    meaning: "評価する、査定する",
    example: "We need to evaluate the results carefully."
  },
  {
    id: 30,
    word: "evidence",
    meaning: "証拠、根拠",
    example: "There is no evidence to support this claim."
  },
  {
    id: 31,
    word: "fundamental",
    meaning: "基本的な、根本的な",
    example: "This is a fundamental principle of physics."
  },
  {
    id: 32,
    word: "generate",
    meaning: "生成する、発生させる",
    example: "Solar panels generate electricity."
  },
  {
    id: 33,
    word: "identify",
    meaning: "特定する、識別する",
    example: "Can you identify the problem?"
  },
  {
    id: 34,
    word: "implement",
    meaning: "実行する、実装する",
    example: "We will implement the new policy next month."
  },
  {
    id: 35,
    word: "imply",
    meaning: "暗示する、意味する",
    example: "What are you trying to imply?"
  },
  {
    id: 36,
    word: "indicate",
    meaning: "示す、指し示す",
    example: "The data indicates a positive trend."
  },
  {
    id: 37,
    word: "initiative",
    meaning: "主導権、率先",
    example: "Take the initiative and lead the project."
  },
  {
    id: 38,
    word: "interpret",
    meaning: "解釈する、通訳する",
    example: "How do you interpret this data?"
  },
  {
    id: 39,
    word: "maintain",
    meaning: "維持する、保つ",
    example: "It's important to maintain good relationships."
  },
  {
    id: 40,
    word: "modify",
    meaning: "修正する、変更する",
    example: "We need to modify our approach."
  },
  {
    id: 41,
    word: "obtain",
    meaning: "得る、獲得する",
    example: "You need to obtain permission first."
  },
  {
    id: 42,
    word: "occur",
    meaning: "起こる、発生する",
    example: "Accidents can occur at any time."
  },
  {
    id: 43,
    word: "participate",
    meaning: "参加する、関与する",
    example: "Everyone is encouraged to participate."
  },
  {
    id: 44,
    word: "perceive",
    meaning: "知覚する、認識する",
    example: "People perceive the world differently."
  },
  {
    id: 45,
    word: "potential",
    meaning: "可能性のある、潜在的な",
    example: "She has great potential as a leader."
  },
  {
    id: 46,
    word: "previous",
    meaning: "以前の、前の",
    example: "Refer to the previous chapter for details."
  },
  {
    id: 47,
    word: "prioritize",
    meaning: "優先順位をつける",
    example: "We need to prioritize our tasks."
  },
  {
    id: 48,
    word: "significant",
    meaning: "重要な、意味のある",
    example: "This is a significant achievement."
  },
  {
    id: 49,
    word: "sufficient",
    meaning: "十分な、足りる",
    example: "Do we have sufficient resources?"
  },
  {
    id: 50,
    word: "summarize",
    meaning: "要約する、まとめる",
    example: "Let me summarize the main points."
  }
];

const PLACEHOLDER_MEANING = '辞書データ (意味未登録)';
const PLACEHOLDER_EXAMPLE = '例文未登録';

function buildWordsData() {
  const targetCount = 6000;

  if (BASE_WORDS.length >= targetCount) {
    return BASE_WORDS;
  }

  const expanded = [...BASE_WORDS];
  if (typeof EXTRA_WORDS === 'undefined') {
    console.warn('Extra words data not found');
    return expanded;
  }
  const extraWords = EXTRA_WORDS;
  const extraNeeded = targetCount - expanded.length;
  const extraSlice = extraWords.slice(0, extraNeeded);
  const startId = expanded.length + 1;

  extraSlice.forEach((word, index) => {
    expanded.push({
      id: startId + index,
      word,
      meaning: PLACEHOLDER_MEANING,
      example: PLACEHOLDER_EXAMPLE
    });
  });

  return expanded;
}

const WORDS_DATA = buildWordsData();
