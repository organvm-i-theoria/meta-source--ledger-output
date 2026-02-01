// T012: Letter Mapping
const LETTER_MAP: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y']; // Y is tricky, treating as vowel for MVP simplicity

// T013: Reduce function
const reduceNumber = (num: number): { reduced: number, isMaster: boolean } => {
    let current = num;
    // Check master numbers first
    if (current === 11 || current === 22 || current === 33) {
        return { reduced: current, isMaster: true };
    }
    
    while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
        current = String(current).split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return { 
        reduced: current, 
        isMaster: (current === 11 || current === 22 || current === 33) 
    };
};

const cleanString = (str: string) => str.toLowerCase().replace(/[^a-z]/g, '');

export const PythagoreanCalculator = {
    calculate(name: string, birthdate: string) {
        const cleanName = cleanString(name);
        
        // Destiny (Expression): Sum of all letters
        let rawDestiny = 0;
        let rawSoul = 0; // Vowels
        let rawPersonality = 0; // Consonants
        
        for (const char of cleanName) {
            const val = LETTER_MAP[char] || 0;
            rawDestiny += val;
            if (VOWELS.includes(char)) {
                rawSoul += val;
            } else {
                rawPersonality += val;
            }
        }
        
        // Life Path: Sum of birthdate digits
        // Method: Reduce Year, Month, Day separately then sum? Or sum all digits?
        // Standard Pythagorean: Reduce each component then sum.
        // 1990-04-15 -> 1990 (1+9+9+0=19->1+9=10->1), 04 (4), 15 (1+5=6). 1+4+6=11.
        
        // Naive parsing for MVP
        const dateStr = birthdate.replace(/-/g, ''); // 19900415
        let rawLifePath = 0;
        for(const char of dateStr) {
            rawLifePath += parseInt(char);
        }
        
        const destiny = reduceNumber(rawDestiny);
        const lifePath = reduceNumber(rawLifePath);
        const soulUrge = reduceNumber(rawSoul);
        const personality = reduceNumber(rawPersonality);
        
        return {
            system: 'pythagorean' as const,
            destiny: destiny.reduced,
            lifePath: lifePath.reduced,
            soulUrge: soulUrge.reduced,
            personality: personality.reduced,
            expression: destiny.reduced, // Synonymous
            rawSum: rawDestiny,
            isMasterNumber: destiny.isMaster || lifePath.isMaster
        };
    }
};
