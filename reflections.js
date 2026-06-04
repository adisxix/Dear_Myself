import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

const KEY = 'AQ.Ab8RN6LEEO8b9iyi0BYW-PQW42buhnTAEPQ6pl0ZrbIGdZOCwg';
const genAI = new GoogleGenerativeAI(KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const statusText = document.getElementById('statusText');
const reflectionText = document.getElementById('reflectionText');
const affirmationText = document.getElementById('affirmationText');

function getDiaryData() {
  return {
    moods: JSON.parse(localStorage.getItem('dearmyself_moods') || '[]'),
    dayReflection: localStorage.getItem('dearmyself_dayReflection') || '',
    energy: localStorage.getItem('dearmyself_energy') || '',
    selfCare: localStorage.getItem('dearmyself_selfCare') || ''
  };
}

function tryExtractJson(text) {
  try { return JSON.parse(text); } catch { }
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

async function generateReflection() {
  const data = getDiaryData();

  const hasData = data.dayReflection || data.moods.length > 0 || data.energy || data.selfCare;

  if (!hasData) {
    statusText.textContent = 'No diary entries found. Please complete mood, day, and energy steps first.';
    reflectionText.textContent = '';
    affirmationText.textContent = '';
    return;
  }

  statusText.textContent = 'Analyzing your day… ✨';
  reflectionText.textContent = '';
  affirmationText.textContent = '';

  const userPrompt = [
    'You are a warm, supportive daily reflection coach.',
    'Based on the user inputs below, generate EXACTLY 2 things:',
    '1) reflection: 1-2 short sentences (max 30 words)',
    '2) affirmation: 1 uplifting sentence (max 12 words)',
    'Return ONLY valid JSON: {"reflection": "...", "affirmation": "..."}',
    '',
    `moods: ${data.moods.join(', ') || 'Not provided'}`,
    `dayReflection: ${data.dayReflection || 'Not provided'}`,
    `energyLevel: ${data.energy || 'Not provided'}`,
    `selfCare: ${data.selfCare || 'Not provided'}`
  ].join('\n');

  try {
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    const content = response.text();

    const parsed = tryExtractJson(content);

    if (!parsed || (!parsed.reflection && !parsed.affirmation)) {
      throw new Error('Could not parse AI response. Please try again.');
    }

    reflectionText.textContent = parsed.reflection || '';
    affirmationText.textContent = parsed.affirmation || '';
    statusText.textContent = 'Your personalized reflection is ready ✨';

  } catch (err) {
    console.error('Bytez error:', err);
    statusText.textContent = `Something went wrong: ${err?.message || 'Unknown error'}`;
    reflectionText.textContent = '';
    affirmationText.textContent = '';
  }
}

window.generateReflection = generateReflection;

generateReflection();