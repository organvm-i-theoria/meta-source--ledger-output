# **Cryptographic Theory: Mechanical Foundations, State Logic, and Visualization Paradigms in Classical and Electro-Mechanical Systems**

The advancement of cryptographic systems from rudimentary substitution methods to sophisticated electro-mechanical state machines represents one of the most significant intellectual shifts in the history of information security. At the intersection of mathematical logic and mechanical engineering lies the challenge of state representation—how the internal configuration of a cipher transforms plaintext into ciphertext and how these transformations can be rendered for educational and analytical clarity.1 While classical systems such as the Caesar and Vigenère ciphers operate on relatively static mathematical planes, the Enigma machine introduced a dynamic, multi-layered substitution environment where every keystroke altered the entire logic of the circuit.4 This report investigates the mathematical underpinnings of these systems, the mechanical anomalies that defined their cryptographic strength, and the modern visualization frameworks used to bridge the gap between abstract theory and physical execution.7

## **Executive Summary**

The internal logic of cryptographic systems is fundamentally defined by the relationship between cipher state and output character mapping. Classical substitution ciphers, ranging from the monoalphabetic Caesar shift to polyalphabetic Vigenère systems, utilize modular arithmetic and periodic key repetition to obscure plaintext frequencies.1 The Enigma machine, however, transcended these mathematical models by implementing an electro-mechanical scrambler that utilized rotating disks, a reciprocal reflector, and a plugboard to create a massive key space of approximately ![][image1] possible configurations.2 Effective visualization of these systems requires a transition from static 2D matrices to real-time 3D simulations that can capture mechanical events like the "double-stepping" anomaly—a phenomenon where the middle rotor advances twice in succession due to pawl-and-ratchet dynamics.13 Modern educational tools such as CrypTool 2 leverage visual programming to render these complexities, yet gaps remain in integrating interactive cryptanalysis and AI-driven anomaly detection.7 By mapping mathematical properties like the Index of Coincidence to visual metaphors, educators can reveal the structural vulnerabilities that allowed Bletchley Park and Polish cryptanalysts to break seemingly invincible codes.17

## **Task 2A: Substitution Cipher Theory and Mechanics**

The foundational principles of substitution ciphers rest upon the systematic replacement of alphabet units with ciphertext counterparts according to a specific key or algorithm.4 The Caesar cipher, documented as one of the earliest known encryption methods, operates through a fixed shift operation where each letter in the plaintext is moved ![][image2] positions down the alphabet.4 Mathematically, if we assign each letter ![][image3] a numerical value from 0 to 25 (![][image4]), the encryption function is defined as ![][image5], where ![][image6] is the key.1 With only 25 possible non-trivial keys, the Caesar cipher is highly susceptible to brute-force attacks, as an adversary can rapidly test all permutations until plaintext is revealed.20

The Vigenère system evolved to address the primary weakness of monoalphabetic substitution: the preservation of letter frequency.1 By utilizing a series of interwoven Caesar ciphers based on a repeating keyword, the Vigenère cipher implements polyalphabetic substitution.1 If the plaintext is "GOODMORNING" and the keyword is "HELLO," the key is repeated to match the message length ("HELLOHELLO H"). Each letter of the plaintext is then shifted by the value of the corresponding key letter (![][image7], etc.).1

| Plaintext | Numerical (Pi​) | Key | Key Value (Ki​) | Ciphertext (Ci​=(Pi​+Ki​)(mod26)) |
| :---- | :---- | :---- | :---- | :---- |
| G | 6 | H | 7 | N (13) |
| O | 14 | E | 4 | S (18) |
| O | 14 | L | 11 | Z (25) |
| D | 3 | L | 11 | O (14) |
| M | 12 | O | 14 | A (26 ![][image8] 0\) |
| O | 14 | H | 7 | V (21) |
| R | 17 | E | 4 | V (21) |
| N | 13 | L | 11 | Y (24) |
| I | 8 | L | 11 | T (19) |
| N | 13 | O | 14 | B (27 ![][image8] 1\) |
| G | 6 | H | 7 | N (13) |

This polyalphabetic approach flattens the frequency distribution, making standard frequency analysis ineffective.1 However, the repeat period of the keyword introduces a hidden periodicity that can be identified through the Kasiski examination—finding repeated patterns in the ciphertext to deduce the key length—and the Index of Coincidence (IC), which measures the "roughness" of the distribution.8 Homophonic substitution ciphers further advance this by mapping common letters like 'E' to multiple ciphertext symbols proportional to their frequency, effectively creating a uniform distribution that defies statistical detection.24

Visualization opportunities for these systems are vast and critical for conceptual mastery. For the Caesar cipher, a physical or digital "cipher wheel" where two concentric rings of letters can be rotated relative to each other provides an immediate representation of the key space and state.20 For the Vigenère system, the "Tabula Recta"—a ![][image9] matrix of all possible Caesar shifts—serves as the primary visual aid, allowing students to trace the intersection of plaintext columns and key rows.1 Real-time rendering of these processes should emphasize the "sliding" nature of the key against the plaintext, highlighting how the same plaintext letter (e.g., 'O' in 'GOOD') can transform into different ciphertext letters ('S' and 'Z') depending on its position in the key cycle.1

### **Visualization Opportunity Matrix for Classical Ciphers**

| Cipher System | Internal Logic to Visualize | Recommended Visual Metaphor | State Change Representation |
| :---- | :---- | :---- | :---- |
| Caesar | Fixed shift offset | Concentric Alphabet Wheels | Rotation of the inner wheel by ![][image6] units 20 |
| Vigenère | Periodic multi-shift | 2D Tabula Recta Grid | Highlighted intersection point moving per letter 1 |
| Homophonic | One-to-many mapping | Probabilistic Flow Diagram | Expanding nodes representing multiple options for 'E' 24 |
| Playfair | Digram block mapping | ![][image10] Character Matrix | Geometric selection (rectangle/row/column rules) 21 |

## **Task 2B: Enigma Machine Reverse-Engineering**

The Enigma machine represents an electro-mechanical transition where cryptographic state is defined by the physical orientation of three or four rotors, the configuration of a plugboard, and the wiring of a reflector.2 Unlike mathematical ciphers that rely on simple arithmetic, the Enigma constructs a complex, varying electrical circuit for every character.2 When a key is depressed, current flows from a 4-volt battery through a bi-directional switch, into the plugboard, through an entry wheel (ETW), into the rotor stack, hits the reflector (UKW), and returns through the rotors in reverse order before lighting a lamp.5

### **Rotor Mechanics and Physical Parameters**

Each rotor is approximately 10 cm in diameter and constructed from Bakelite or hard rubber, featuring 26 spring-loaded brass pins on one side and 26 flat contacts on the other.5 These represent the alphabet A–Z (or numbers 01–26).5 Inside the rotor, complex internal wiring connects each pin on the right to a contact on the left in a unique permutation.6 The military Enigma models utilized specific rotor sets, such as the Wehrmacht's I through V, or the Kriegsmarine's additional VI, VII, and VIII, which featured two turnover notches instead of one.5

| Rotor Type | Wiring Permutation (A to Z) | Turnover Point | Mnemonic (BP) |
| :---- | :---- | :---- | :---- |
| I | EKMFLGDQVZNTOWYHXUSPAIBRCJ | Q ![][image8] R | Royal 2 |
| II | AJDKSIRUXBLHWTMCQGZNPYFVOE | E ![][image8] F | Flags 2 |
| III | BDFHJLCPRTXVZNYEIWGAKMUSQO | V ![][image8] W | Wave 2 |
| IV | ESOVPZJAYQUIRHXLNFTGKDCMWB | J ![][image8] K | Kings 2 |
| V | VZBRGITYUPSDNHLXAWMJQOFECK | Z ![][image8] A | Above 2 |
| VI | JPGVOUMFYQBENHZRDKASXLICTW | Z ![][image8] A and M ![][image8] N | \- 5 |
| VII | NZJHGRCXMYSWBOUFAIVLPEKQDT | Z ![][image8] A and M ![][image8] N | \- 5 |
| VIII | FKQHTLXOCBJSPDZRAMEWNIUYGV | Z ![][image8] A and M ![][image8] N | \- 5 |

The reflector (Umkehrwalze) is the most distinctive feature of the Enigma, as it does not allow a letter to be mapped to itself.5 By wiring contacts in 13 reciprocal pairs (e.g., A to Y, and Y to A), the reflector ensures that the machine is self-reciprocal: the same settings can be used for both encryption and decryption.5 This design choice facilitated ease of use in the field but provided Bletchley Park with the critical "no letter can be itself" constraint used to align cribs.17

### **Plugboard Configuration and Signal Flow**

The plugboard (Steckerbrett) adds the most significant layer of complexity to the Enigma, allowing up to 10 pairs of letters to be swapped via external cables.12 For instance, if 'A' and 'S' are plugged together, a signal for 'A' becomes 'S' before entering the rotors, and on the return path, an 'S' becomes an 'A' before lighting the lamp.29 The number of possible plugboard combinations—approximately ![][image11] trillion—makes brute-force cryptanalysis impossible without mechanical aid.2

**Enigma Signal Interaction Flowchart (Sequential Logic):**

1. **Input:** User presses key 'Q'.  
2. **Rotor Step:** The rightmost rotor moves one position **before** contact is made.30  
3. **Plugboard (Forward):** Signal 'Q' is checked; if swapped (e.g., Q-A), it enters the ETW as 'A'.30  
4. **ETW:** Static entry wheel passes signal to the first rotor pin (Position 'A').6  
5. **Rotor Stack (Forward):** Signal passes through Rotor 1 (Fast), Rotor 2 (Middle), and Rotor 3 (Slow). Each stage applies a substitution based on internal wiring and the relative offset of the ring setting and rotary position.31  
6. **Reflector (UKW):** Signal hits a pair (e.g., D-H) and is reflected back as 'H'.33  
7. **Rotor Stack (Backward):** Signal returns through Rotor 3, Rotor 2, and Rotor 1\. Crucially, it uses the inverse of the forward permutations.32  
8. **ETW and Plugboard (Return):** Signal leaves the ETW and hits the plugboard a second time for a potential swap (e.g., H-E).30  
9. **Output:** Lamp 'E' illuminates.36

## **Task 2C: Enigma Stepping Mechanics and State Visualization**

The mechanical movement of the Enigma rotors is not a simple linear progression like an odometer, but a complex interaction of pawls and notches that leads to a specific cryptographic period.6 Every time a key is pressed, a large pivoted lever pushes three spring-loaded pawls (levers).13 The first pawl always engages the ratchet of the rightmost rotor, causing it to step every time.13 The second and third pawls are held away from their respective ratchets by the index rings of the adjacent rotors until a notch appears.13

### **The Double-Stepping Anomaly**

The "double-stepping" of the middle rotor is a mechanical quirk resulting from the fact that the second pawl, when it drops into the notch of the first rotor, not only pushes the second rotor forward but is also moved by the first rotor's own rotation.13 More significantly, the middle rotor itself has a notch; when the third pawl drops into the middle rotor's notch, it pushes the third rotor forward, but because it is also engaged with the middle rotor's notch, it pushes the middle rotor forward **again** on the next step.6

| Keystone Step | Left Rotor (Slow) | Middle Rotor | Right Rotor (Fast) | Action Detail |
| :---- | :---- | :---- | :---- | :---- |
| **![][image12]** | A | D | Q | Initial position 6 |
| ![][image13] | A | D | R | Right rotor steps; Notch at 'Q' passed 6 |
| ![][image13] | A | E | S | Right rotor steps; takes Middle rotor along 6 |
| ![][image13] | B | F | T | **Double Step:** Middle rotor was at notch 'E'; pawl 3 pushes Left and Middle rotors 13 |

This behavior reduces the machine's maximum cycle from 17,576 letters to 16,900.6 For clear visualization, an animation should specifically render the vertical drop of the pawls into the notches.3 While the rotors appear to rotate smoothly in many 2D simulators, 3D engines like Virtual Colossus provide a superior perspective by showing the "ratcheting" action and the mechanical displacement of the levers.3

### **Worked Example: State to Output Relationship**

Consider an Enigma I set with Rotor Order (I, II, III), Ring Settings (AAA), and Start Positions (AAZ). If the operator presses 'A':

1. **State Change:** The rightmost rotor steps from 'Z' to 'A'. The machine state is now (AAA).33  
2. **Wiring Path:** The signal for 'A' enters the ETW. In Rotor III (position A), 'A' maps to 'E'.32  
3. **Reflector:** After passing through II and I, it hits UKW-B. If the signal arriving is 'D', it reflects as 'H'.33  
4. **Result:** The final lamp lights 'B'. If the operator presses 'A' again, the right rotor steps to 'B', changing the internal wiring entirely, and the second 'A' might light up 'D'.12

## **Task 2D: Frequency Analysis and Visual Cryptanalysis**

Visualizing the statistical properties of ciphertext is the primary method through which encrypted information is revealed.8 Frequency analysis exploits the fact that in natural language, certain letters occur more often than others (e.g., 'E' at 13%, 'T' at 9% in English).8 In a monoalphabetic cipher, the frequency "fingerprint" of the language is preserved, merely shifted.11

### **Statistical Tests and Visualization Strategies**

The Index of Coincidence (IC) is a robust statistical measure used to distinguish between cipher types.8 By calculating the probability that two randomly selected letters are equal, cryptanalysts can determine if a text is likely monoalphabetic (IC ![][image14]) or polyalphabetic (IC ![][image15]).19

| Metric | Random Text | English Plaintext | Swedish Plaintext | German Plaintext |
| :---- | :---- | :---- | :---- | :---- |
| Index of Coincidence | 0.0385 | 0.0667 | 0.0644 | 0.0762 |
| Source ID | 19 | 40 | 40 | 40 |

Modern digital tools like CrypTool 2 visualize these tests using bar charts and line graphs, allowing the user to see "peaks" in coincidence when the correct key period is selected.7 For instance, by offsetting a ciphertext by ![][image2] positions and counting matches, a peak at ![][image16] indicates a 7-letter Vigenère key.10

### **Bletchley Park’s Visual Aids: The Bombe and Zygalski Sheets**

Bletchley Park operators utilized mechanical and visual aids to solve the Enigma when hand-methods failed.18 Alan Turing’s Bombe machine was an industrial-scale search engine that looked for logical contradictions in potential plugboard settings.35 The Bombe used "menus"—visual graphs of letter relationships derived from cribs.17 If a crib "ATTACK" was aligned with ciphertext "WNS PNL," the menu would draw a connection between A-W at position 1, T-N at position 2, and so on.17 By finding "loops" in this graph, the Bombe could apply a test voltage to a starting assumption; if the circuit returned a result where a letter was mapped to two different letters, it indicated a contradiction, and the machine moved to the next rotor setting.35

The Zygalski sheets provided a manual visual method for identifying "females"—patterns where the same plaintext letter encrypted to the same ciphertext letter at different positions in the message indicator.18 By stacking 26 perforated sheets and shifting them, cryptanalysts looked for a single point where light shone through all layers, representing a valid rotor configuration.18 This was a pioneering form of visual pattern matching in high-dimensional state spaces.42

## **Task 2E: Educational Cipher Visualization Tools: Existing Landscape**

The current ecosystem of educational tools for cryptography ranges from simple web-based applications to complex open-source frameworks.39 These tools are designed to facilitate "active learning," engaging students with the internal mechanics of ciphers through direct manipulation and visual feedback.3

### **Catalog of Academic and Research Tools**

| Tool Name | Framework/Language | Emphasis | Level of Interactivity |
| :---- | :---- | :---- | :---- |
| CrypTool 2 (CT2) | .NET / C\# | Visual programming; Modern & Classic | High; Drag-and-drop workflow 7 |
| Virtual Enigma | WebGL / Browser | Historical 3D Emulation | High; 3D camera and manual rotor handling 35 |
| CyberChef | JavaScript | Practical data transformation | Moderate; Functional "recipe" building 38 |
| GRACE | Java | Visual metaphors and protocol animation | Moderate; Step-by-step scenario execution 47 |
| vizLab | Python / Web | K-12 block-based programming | High; Algorithmic construction from blocks 9 |

CrypTool 2 remains the most comprehensive academic framework, utilizing a plugin architecture that allows developers to add new algorithms such as AES or post-quantum schemes.7 Its strength lies in its ability to visualize both the "big picture" of a cryptographic protocol and the "detailed view" of a single algorithm's internal round transformations.7

### **Implementation Gaps and Research Opportunities**

Despite the availability of these tools, several gaps persist in the current landscape:

1. **Ecological Validity and Long-term Adoption:** Research shows that while students appreciate visualizations during lectures, they rarely use them for self-directed study outside of class, often because the tools are not perceived as educationally beneficial for exam preparation.15  
2. **Interactivity and Agency:** Many existing tools are passive animations rather than true simulations.3 There is a need for "experiential learning" models where students must actively debug or "break" a cipher to understand its properties.52  
3. **AI and Generative Support:** The post-2022 era of AI tools like ChatGPT provides a new opportunity to integrate LLM-based assistants that can explain visualization results in natural language, helping students who lack computational backgrounds.54  
4. **Hardware Emulation:** There is a lack of high-fidelity mechanical simulations that bridge the gap between "electrical circuit" and "mathematical permutation".36 For instance, few Enigma simulators effectively visualize the "spark" of the contact or the physical displacement of the ring settings in a way that correlates to the mathematical ![][image17] transformation.36

### **Gap Analysis Summary**

| Identified Gap | Consequence | Potential Solution |
| :---- | :---- | :---- |
| Passive vs Active Learning | Limited retention of knowledge 3 | Integration of "gamified" cryptanalysis challenges 52 |
| Disconnect between math and mechanics | Abstract concepts feel irrelevant 56 | Synchronized split-screen views of mechanical steps and modular equations 23 |
| Lack of AI integration | Students struggle with interpretation of complex data 54 | Real-time AI "reflection" agents within the visualization interface 52 |

## **Conclusion and Recommendations**

The investigation of cryptographic theory through the lens of mechanical and mathematical foundations reveals that security is often a function of physical complexity and state-dependent logic.2 Classical ciphers established the modular shift paradigms that still underpin modern block ciphers, while the Enigma machine demonstrated the power of electro-mechanical permutations.1 To advance the field of cryptographic education, visualization tools must evolve from static diagrams to high-fidelity, interactive simulations that capture mechanical anomalies and statistical signatures in real-time.3 Educators should prioritize tools that integrate algorithmic logic with physical state representation, leveraging frameworks like CrypTool 2 while addressing the engagement gaps through gamification and AI-assisted interpretation.7 By making the invisible electrical pathways of the past visible to the students of the future, the complexity of cryptography can be transformed into a transparent and mastery-oriented discipline.3

#### **Works cited**

1. Vigenere Cipher \- Maple Help \- Maplesoft, accessed December 28, 2025, [https://www.maplesoft.com/support/help/maple/view.aspx?path=MathApps%2FVigenereCipher](https://www.maplesoft.com/support/help/maple/view.aspx?path=MathApps/VigenereCipher)  
2. Enigma machine \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Enigma\_machine](https://en.wikipedia.org/wiki/Enigma_machine)  
3. Enhancing cryptography education via visualization tools | Request PDF \- ResearchGate, accessed December 28, 2025, [https://www.researchgate.net/publication/220995337\_Enhancing\_cryptography\_education\_via\_visualization\_tools](https://www.researchgate.net/publication/220995337_Enhancing_cryptography_education_via_visualization_tools)  
4. Crack the Code: Understanding the Caesar and Vigenère Ciphers | by Dennis Duke, accessed December 28, 2025, [https://medium.com/@dennis\_39505/crack-the-code-understanding-the-caesar-and-vigen%C3%A8re-ciphers-0bf66105389d](https://medium.com/@dennis_39505/crack-the-code-understanding-the-caesar-and-vigen%C3%A8re-ciphers-0bf66105389d)  
5. Enigma Tech Details \- Cipher Machines and Cryptology, accessed December 28, 2025, [https://www.ciphermachinesandcryptology.com/en/enigmatech.htm](https://www.ciphermachinesandcryptology.com/en/enigmatech.htm)  
6. Enigma \- Crypto Museum, accessed December 28, 2025, [https://www.cryptomuseum.com/crypto/enigma/working.htm](https://www.cryptomuseum.com/crypto/enigma/working.htm)  
7. About CrypTool 2, accessed December 28, 2025, [https://www.cryptool.org/en/ct2/](https://www.cryptool.org/en/ct2/)  
8. Index of Coincidence \- Cryptanalysis \- Practical Cryptography, accessed December 28, 2025, [http://practicalcryptography.com/cryptanalysis/text-characterisation/index-coincidence/](http://practicalcryptography.com/cryptanalysis/text-characterisation/index-coincidence/)  
9. Enhancing Cryptography Education Using Collaborative Visual Programming \- Pixel International Conferences, accessed December 28, 2025, [https://conference.pixel-online.net/files/foe/ed0012/FP/7728-ELRN5513-FP-FOE12.pdf](https://conference.pixel-online.net/files/foe/ed0012/FP/7728-ELRN5513-FP-FOE12.pdf)  
10. Caesar Cipher Example, accessed December 28, 2025, [https://math.colorado.edu/\~kstange/teaching-resources/crypto/slides-first-week.pdf](https://math.colorado.edu/~kstange/teaching-resources/crypto/slides-first-week.pdf)  
11. Index of coincidence \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Index\_of\_coincidence](https://en.wikipedia.org/wiki/Index_of_coincidence)  
12. Enigma Machine | Brilliant Math & Science Wiki, accessed December 28, 2025, [https://brilliant.org/wiki/enigma-machine/](https://brilliant.org/wiki/enigma-machine/)  
13. Enigma: Actions Involved In The \`Double Stepping ... \- Crypto Museum, accessed December 28, 2025, [https://www.cryptomuseum.com/people/hamer/files/double\_stepping.pdf](https://www.cryptomuseum.com/people/hamer/files/double_stepping.pdf)  
14. Was the Enigma's double stepping mechanism intentional? \- Cryptography Stack Exchange, accessed December 28, 2025, [https://crypto.stackexchange.com/questions/71389/was-the-enigmas-double-stepping-mechanism-intentional](https://crypto.stackexchange.com/questions/71389/was-the-enigmas-double-stepping-mechanism-intentional)  
15. Shortcomings of Visualizations for Human-in-the-Loop Machine Learning | Stanford HAI, accessed December 28, 2025, [https://hai.stanford.edu/news/shortcomings-visualizations-human-loop-machine-learning](https://hai.stanford.edu/news/shortcomings-visualizations-human-loop-machine-learning)  
16. Exploring the Role of Visualization Tools in Enhancing Computing Education: A Systematic Literature Review \- Digital Library, accessed December 28, 2025, [https://diglib.eg.org/bitstreams/c65f8ea5-9633-4a64-8758-906ce2e446e1/download](https://diglib.eg.org/bitstreams/c65f8ea5-9633-4a64-8758-906ce2e446e1/download)  
17. Bombe \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Bombe](https://en.wikipedia.org/wiki/Bombe)  
18. Virtual Bletchley Park by Tony Sale \- WW II Codes and Ciphers, accessed December 28, 2025, [https://www.codesandciphers.org.uk/virtualbp/poles/poles.htm](https://www.codesandciphers.org.uk/virtualbp/poles/poles.htm)  
19. Index of coincidence \- Grokipedia, accessed December 28, 2025, [https://grokipedia.com/page/Index\_of\_coincidence](https://grokipedia.com/page/Index_of_coincidence)  
20. Tutorial: Caesar and Vigenere Ciphers \- CodeHS, accessed December 28, 2025, [https://codehs.com/tutorial/jennifer/caesar-and-vigenere-ciphers](https://codehs.com/tutorial/jennifer/caesar-and-vigenere-ciphers)  
21. Cryptography Playground, accessed December 28, 2025, [https://jack-piro.vercel.app/](https://jack-piro.vercel.app/)  
22. Index of Coincidence, accessed December 28, 2025, [https://pages.mtu.edu/\~shene/NSF-4/Tutorial/VIG/Vig-IOC.html](https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-IOC.html)  
23. 4 Many Caesars: the Vigenère Cipher, accessed December 28, 2025, [https://www.math.stonybrook.edu/\~scott/papers/MSTP/crypto/4Many\_Caesars.html](https://www.math.stonybrook.edu/~scott/papers/MSTP/crypto/4Many_Caesars.html)  
24. The Black Chamber \- Homophonic Cipher \- Simon Singh, accessed December 28, 2025, [https://simonsingh.net/The\_Black\_Chamber/homophonic\_cipher.html](https://simonsingh.net/The_Black_Chamber/homophonic_cipher.html)  
25. Homophonic Substitution Cipher \- Practical Cryptography, accessed December 28, 2025, [http://practicalcryptography.com/ciphers/homophonic-substitution-cipher/](http://practicalcryptography.com/ciphers/homophonic-substitution-cipher/)  
26. Efficient Cryptanalysis of Homophonic Substitution Ciphers \- Department of Computer Science, accessed December 28, 2025, [http://www.cs.sjsu.edu/faculty/stamp/papers/topics/topic20/homophonic2.pdf](http://www.cs.sjsu.edu/faculty/stamp/papers/topics/topic20/homophonic2.pdf)  
27. Enigma Machine Emulator \- 101 Computing, accessed December 28, 2025, [https://www.101computing.net/enigma-machine-emulator/](https://www.101computing.net/enigma-machine-emulator/)  
28. 2.3.3 Homophonic Substitution Cipher, accessed December 28, 2025, [https://www.uobabylon.edu.iq/eprints/publication\_12\_4988\_49.pdf](https://www.uobabylon.edu.iq/eprints/publication_12_4988_49.pdf)  
29. The Turing bombe in Bletchley Park \- The Rutherford Journal, accessed December 28, 2025, [https://rutherfordjournal.org/article030108.html](https://rutherfordjournal.org/article030108.html)  
30. Technical Information \- Virtual Enigma, accessed December 28, 2025, [https://enigma.virtualcolossus.co.uk/technical.html](https://enigma.virtualcolossus.co.uk/technical.html)  
31. Enigma machine \- dlab @ EPFL, accessed December 28, 2025, [https://dlab.epfl.ch/wikispeedia/wpcd/wp/e/Enigma\_machine.htm](https://dlab.epfl.ch/wikispeedia/wpcd/wp/e/Enigma_machine.htm)  
32. The Enigma Rotors \- WW II Codes and Ciphers, accessed December 28, 2025, [https://www.codesandciphers.org.uk/enigma/rotorspec.htm](https://www.codesandciphers.org.uk/enigma/rotorspec.htm)  
33. Enigma rotor details \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Enigma\_rotor\_details](https://en.wikipedia.org/wiki/Enigma_rotor_details)  
34. Enigma (step-by-step) \- CrypTool Portal, accessed December 28, 2025, [https://legacy.cryptool.org/en/cto/enigma-step-by-step](https://legacy.cryptool.org/en/cto/enigma-step-by-step)  
35. Bombe Technical Information \- Virtual Turing-Welchman Bombe, accessed December 28, 2025, [https://bombe.virtualcolossus.co.uk/technical.html](https://bombe.virtualcolossus.co.uk/technical.html)  
36. Enigma Simulator \- GitHub Pages, accessed December 28, 2025, [https://piotte13.github.io/enigma-cipher/](https://piotte13.github.io/enigma-cipher/)  
37. BombeMachine \- School of Electrical and Computer Engineering, accessed December 28, 2025, [https://people.ece.cornell.edu/land/courses/ece5760/FinalProjects/s2022/az292\_kw456\_lh479/az292\_kw456\_lh479/index.html](https://people.ece.cornell.edu/land/courses/ece5760/FinalProjects/s2022/az292_kw456_lh479/az292_kw456_lh479/index.html)  
38. Enigma machine / Tom MacWright \- Observable, accessed December 28, 2025, [https://observablehq.com/@tmcw/enigma-machine](https://observablehq.com/@tmcw/enigma-machine)  
39. Virtual Enigma, accessed December 28, 2025, [https://enigma.virtualcolossus.co.uk/](https://enigma.virtualcolossus.co.uk/)  
40. Index of coincidence \- The CTF Recipes, accessed December 28, 2025, [https://www.ctfrecipes.com/cryptography/mono-alphabetic-substitution/index-of-coincidence](https://www.ctfrecipes.com/cryptography/mono-alphabetic-substitution/index-of-coincidence)  
41. 6 facts about the Bombe | Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/6-facts-about-the-bombe/](https://www.bletchleypark.org.uk/our-story/6-facts-about-the-bombe/)  
42. Zygalski sheets \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Zygalski\_sheets](https://en.wikipedia.org/wiki/Zygalski_sheets)  
43. The Turing-Welchman Bombe \- The National Museum of Computing, accessed December 28, 2025, [https://www.tnmoc.org/bombe](https://www.tnmoc.org/bombe)  
44. Solving the ENIGMA: History of the Cryptanalytic Bombe. \- National Security Agency, accessed December 28, 2025, [https://www.nsa.gov/portals/75/documents/about/cryptologic-heritage/historical-figures-publications/publications/wwii/solving\_enigma.pdf](https://www.nsa.gov/portals/75/documents/about/cryptologic-heritage/historical-figures-publications/publications/wwii/solving_enigma.pdf)  
45. CrypTool: Homepage, accessed December 28, 2025, [https://www.cryptool.org/](https://www.cryptool.org/)  
46. CrypTool-Online, accessed December 28, 2025, [https://www.cryptool.org/cryptool-online/](https://www.cryptool.org/cryptool-online/)  
47. Visualization of cryptographic protocols with GRACE \- ResearchGate, accessed December 28, 2025, [https://www.researchgate.net/publication/229360686\_Visualization\_of\_cryptographic\_protocols\_with\_GRACE](https://www.researchgate.net/publication/229360686_Visualization_of_cryptographic_protocols_with_GRACE)  
48. Reducing the complexity of understanding cryptology using CrypTool, accessed December 28, 2025, [https://www.cryptool.org/media/publications/journals/eista\_2012.pdf](https://www.cryptool.org/media/publications/journals/eista_2012.pdf)  
49. Visualization of Advanced Encryption Standard Cipher using CrypTool \- Zenodo, accessed December 28, 2025, [https://zenodo.org/records/4695339/files/PCSITS\_2021\_95\_96.pdf?download=1](https://zenodo.org/records/4695339/files/PCSITS_2021_95_96.pdf?download=1)  
50. Visualization of AES as a CrypTool 2 Plugin, accessed December 28, 2025, [https://www.cryptool.org/media/publications/theses/BA\_Becher.pdf](https://www.cryptool.org/media/publications/theses/BA_Becher.pdf)  
51. The Reasons Might be Different – Why Students and Teachers Don't Use Visualization Tools, accessed December 28, 2025, [https://www.inf.uni-hamburg.de/inst/ab/csed/home/data/koli2012-knobelsdorf-isohanni-tenenberg.pdf](https://www.inf.uni-hamburg.de/inst/ab/csed/home/data/koli2012-knobelsdorf-isohanni-tenenberg.pdf)  
52. Visual CryptoED: A Role-Playing and Visualization Tool for K-12 Cryptography Education | Request PDF \- ResearchGate, accessed December 28, 2025, [https://www.researchgate.net/publication/378808475\_Visual\_CryptoED\_A\_Role-Playing\_and\_Visualization\_Tool\_for\_K-12\_Cryptography\_Education](https://www.researchgate.net/publication/378808475_Visual_CryptoED_A_Role-Playing_and_Visualization_Tool_for_K-12_Cryptography_Education)  
53. Students' Views on the Use of Cryptology Methods Education Contexts1 \- ERIC, accessed December 28, 2025, [https://files.eric.ed.gov/fulltext/EJ1434306.pdf](https://files.eric.ed.gov/fulltext/EJ1434306.pdf)  
54. Advanced large language models and visualization tools for data analytics learning \- Frontiers, accessed December 28, 2025, [https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1418006/full](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1418006/full)  
55. Identifying the Barriers to Games and Simulations in Education: Creating a Valid and Reliable Survey | Request PDF \- ResearchGate, accessed December 28, 2025, [https://www.researchgate.net/publication/282388310\_Identifying\_the\_Barriers\_to\_Games\_and\_Simulations\_in\_Education\_Creating\_a\_Valid\_and\_Reliable\_Survey](https://www.researchgate.net/publication/282388310_Identifying_the_Barriers_to_Games_and_Simulations_in_Education_Creating_a_Valid_and_Reliable_Survey)  
56. The use of computer games for teaching and learning cybersecurity in higher education institutions \- Journal of Engineering Research, accessed December 28, 2025, [https://kuwaitjournals.org/jer/index.php/JER/article/view/10943/2043](https://kuwaitjournals.org/jer/index.php/JER/article/view/10943/2043)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAXCAYAAACGcCj3AAADBElEQVR4Xu2YS6hPURTGlzclSW4GKI8UY3l0lamSzJiJPPIWhairxJCBiZmUkVeEjBgZmChCIjLyKCJ55R3W1z7bf53v7H0e/3Pdov2rr//e39573XXWPWefh0gi8Y+wUvVL9Uk1ncZuqB6oDpCf6JKFqklZe4S4wg/L+h9VQ7J2n2pT1k604Li4InvQPmzaHhTe9oPsVG1ks4S3qoOqyaqhqvmqm7kZDozdFZfAS9W0/PCAs1h1mk3DPtV7cVvGGhpjcExLVDOyNo8VOKn6Jm4QanIZ+DVWO3IzHN9Vg0z/nWqt6Q8Eu1UfpJPnmfzwH+6rrpr+PdV107esE3fSgQVSLDD3C3RT8L2qE6r1NOa5pJrFptRI5i8SK/gYCecFbyx5o1XPTX+iFNdyv0DTgv9gIwBiniIPZ3tlMso8NgLMZKMGsYLflnBe8I6Rd8u0cfUAuxbbaChWjqYFx1ZRxRVxcR8bD8lin6wCSf9k01B5QBFiBYcfisk+tsRVqtWqXeK2E2DnLBd3gy2lacG/qo6KSwBnMdb35mY4fMLQQ9X+3Gg5wyVehG5pU3BskfZ47PzB4k6QI6onxo+CxZvZLAF38kWmP1dcjHHGAyMz3+tNfrgSLnqoKE3A+rNsSrGAnpjfGgTdymZDEAP/CM/UzMO+PSVr85w6+KL7WG1AjHNsSrywMb81CLqNzRL8G5aFk0N7vOmDa5nfQ34ZuFw5drcgxnk2JR4/5rcGQbezGWGFuPm4aVhscihoLFH4e9iM4IsNar3BVYD1F9iUznM6Aw/fR/odBA69uIBlqgmmjzs05uP50wLvEfVDwPffJMoIPUK2LTrWXmRT3JNFKC682Wy2BZc9AvvvAhZ/0JwM9y8HPOzVeDS0LBV3NtWB43nsWd8Efy+IvT1ibIPpH8q8fgN361eqZ6qn2S++d+B134JLEN9aLP6fhMdC/H6W8A0NZzzG8UiIX3zCrIN9AgqBvzWHzQhbVK/FvR3643whLmfLKOnkeEf1RcLHlEgkEolEIvGf8BvH/enOqDVJyQAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAlUlEQVR4XmNgGAWDCegC8Twg5obyeYG4AYgnADETVAwO2IF4KxBHA/F/IG4G4gVQuXqoGArYC6VhGhqR5EA2YWgohdLXGDAls7GIwQFIoh2L2GU0MTCQYIBIgpwAA3xQMQUofypCCsJBtxpZrBqIlZDkGP4C8VdkASAoYIBo0AfiS2hyDBZAzIouyACJHwN0wVFACAAA3qgdBAlcrcAAAAAASUVORK5CYII=>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAYAAAAs7gcTAAAAiklEQVR4XmNgGAUDASYCcSoSvwOIa5D4YCAOxJeg7Fwg/gXE/6H8s0DcA2WDAUwCBHigfH0gtoCyI5DkGYyQ2GUMqJo5kNgY4BMDqmK8AKRwMbogDAgwQBQoMyDcq4UkfxWJzTCTAaKAE4jPQdmKUDmQJ1dA2WDAyABRAMKuDBAbYPw6JHWjgHwAAGFEHDJYgssXAAAAAElFTkSuQmCC>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANUAAAAYCAYAAABtNrjpAAAE1ElEQVR4Xu2aW6hUVRjHvzLzAhmlgRcqIoroYhKlUkZIZCRFL/USmZeCICMIKTAJBHtQU3uqHkqtJLpRFNVL1IsYlSWCQWRSSKbm/ZapZZfvf769mm/+Z++ZPXOaWTNz1g/+HPb/2+vs9e291l6XPSKJRCKRSCQSiUQ/bld9x2YikWiefzLFZqXqD9UB1TSKNcIY1X6p5HVadUTs/550/nmhQERmqt5is4sJ9xb6S+y+75Pq5xGTr8TqsEt1C8XAYdUS1YWqs1RTVZuqzijB69IZyeLmP+OOT6iWuuNm2CbFecXM+UnVManU4e3qcFeDfJaxqewVi13KgTZxtupPd7xCrD6fOw+EZ+L1eNUZdThTdVTiNjBwq/S//vk5XqPUyivEcLNjgjr0Sqd6QPUem8rXYnliVI7Fb6pV5O0Rq9do5+F4oepV1cPOLw2GZAxxtRpfO8CUL+/68O5nswFQ/n02M2LnHOilToXZBvOyWI6LyW834Xlf4Lz5meen31gqNM01UnmY+EcxGxiu7YfmAPwtbJbkLrHykzigfC8Wu4kDEeilTnUlHT8klt/H5MfgOtWz5C0Wqx/W8oG8dlga34mw8xe7U2EaysDH2qoZvhErjzk8dLnqvsz7STWkcmpUeqlTeW4Qy+1HDnQQB8XqOMx5p1TPi426b2bxG128EOxu3OmOMUVCYeya1WOial2BXhObi65VrREb+l+yYjXBtZEgA7/Zzh7K3ia2ZoMwp8eUFzqjcmpNOEcv5PqKWK6rxXL1D6gMqOM7bHY5mGIhr+McKEEr2lceF4nV8QXy8XLHJ6bAZLHzsMavCbaVPRgWUXA6+e0C18ZWJgP/bzZLgrIfsJkxkM76f4N6vMtmFzNE8u8v1u5XkxcT1A8dsww4N28m9R9YT+AEr9/FCj7mzmsnuDaGXQY+tsUb5W6xstdzICM89LKjVStBPfJ2zLqVvA4F3pDGR/FWgc8ZC9jMGMqGFOfUx3jVl2yKDbkohOG0HpeoljeoehRVGt6LbJbgW8n/f4Gi6+XBudTTKCtWGtSjaIey28AiH/mcwwEpf79b0b48P4htYnkwtQSzxOr5hIuBmu2lKIBvNYjhe0IMMK/lumEUgeffHGNVs91xEbVuwnNiMd4JigXqUjRNvUN1FZvEU2wQc1TnsunAs683Q3lQqrei8/hVLJcrOKCsV33KZgQ+FPuFhOfeTGCeWA4TKuE+4KEzVjFctVtsmpcHNihQcEDbiQME1/cNaKP0n8eGzoJ5exEYKXAOb+OOVH2RxfK++McgvMz4qz4IL5WilwM4JBZ/hAMZ6Ez1/keIY7cuj2ul/v/YIBa/h/wZUllaYJYUk6elkgdrhDuP8/wox+sbBbAJgN+9IUF8Wfbg91khjkaMb1ZTqs5oDxeLVf4z1c+qndXhPhaJbf/P5YBYA8K6DPnwTYOHeTTKY8Ecm0fFdiCR4w7VL2Jvev58gBFsO3kefGvE54FafCI20hSB0XAzmwRecPj9XhHY+EK7waaSv+84xoua21wMuE14ecIAgy11/MUz6YS1d0uZKXE6fSzQoDuBAf3SINHZbGWjx+E3aSya2YVNdAE3i82NBwuYupX5IN9qsB7v+SnQYGUcGz3OZWxEAr8+SCQSiUQikUgkBiP/AqAvfZec4pd2AAAAAElFTkSuQmCC>

[image5]: <data:image/png;base64,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>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAXCAYAAADZTWX7AAAAmElEQVR4XmNgGNzgKhD/AeL/QMyJJocC9jJAFOEFIAVEKZqOLogMpBggiiTQJZDBLAZUq9qA+CmaGIp7DgExHxCvQhIDAxDnNhALAvFGqNhPqDgcgDg7gXgmsiAyiGCAKAIFKIjegyoNAdcZUI0Fsacg8eGC19D4K6Hsj8iCYTAOlJ8NxIxAfAwkIAYVRAZ+ULEPaOJDCwAA1WcrUDQIqsoAAAAASUVORK5CYII=>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHEAAAAYCAYAAADNhRJCAAACqklEQVR4Xu2YS6hOURiGP5cIMSAzl1AyUiQhRkbIJXIpM1MDA8UYJZ2OYyAiIgyYKCXkkktGKHPFCOVObrke3te39rH+z74tOXv9v9ZTT+39vWvvsy79e699RBKJRCKRSORxBL6FPzyfumwAfGayV3Cxy5uEf3sH3ADXw3VwrXO8164OA6V1TGV2u2tiMlG0L5Vknc7jmmg2ygYNMUH+nFxf5n/DedHrx9rAwWyFLUagbG364C+Oje7awFHrJv3IRtgDZ8CpcAqcDLfCg167UKrGdQOOtsWGuQQ/SHk/f8FJYqNlNnAw+2yLDXLRFsBg+NEWA+G4vpvaPu/4unccg3HwDHwhNRaR78CiRgtEs+02iMw3Wwhklui4dpu6Pw8LveMYZH2ptYjZY2U5XCK6cVnkvOWyYX2t47MfbrPFQM6JjmspnAvXwDfwqN8oIqfl94at9iLeg5uNW1xWeQOP6fBEgcfhMdGJ4q74MDyklwUR0p8isnHtFH3fnnXnoZskO8Z/MdYx8Kp3XrmI2fuw6LOBWcz3oYVb/tIB1YT3+JpT85lvzpvC9qNyEZ9LcYN5ohm/z9oF9ue2LQYyR/Q+u0z9kXe8Gq70zpuCu+1ppla5iAyLGlwWzYbboIRJsCvQEPImPxRu23mfkTbwKJoTix1LlVVcgDeN2RrxmI/lFgaJhu36fWjhxov92WQDBzdfRZlP1bj2wlO2GJHS/u4RDbkzs3BCSi+OwAHR/vBfb3lk/Z1tA48hom16bSD6FHkg7TVmkrsOJ+E7+Bq+FN1aZx+9I+B7V2PGNp9EfwWxWSU6mJk2cPAd9lh0V5jHF9FxZpPiy0Xltyc3cfezCyLDJ+QT+NDJ4zstLf5T+J7jv+MSHUzRrzDRIfAj+YotJjqLobaQSCQSiUQJPwHk/uLFqQHsTQAAAABJRU5ErkJggg==>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAUCAYAAABroNZJAAAAT0lEQVR4XmNgGAWjACvYiy5ADviHLkAOsAHiMnRBcsA5IDZHFjAhE98C4n0MUOBHJr4GxWSDiUDsjS5IClAE4k50QVLBJ3QBcsBhdIFhBACxlBEOFeZDIwAAAABJRU5ErkJggg==>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAXCAYAAABTYvy6AAABo0lEQVR4Xu2WTSvFQRTGTxaIlYUVKVZKWVIofwobZXFl4SP4ClbyCaRsLCwsfAVLbLwkxU6xUjbYUuTlPM2ZnHv8367mf0vmV0/Nec7M9Mzt3rlDFIlE/gsTrEfWJ+uE1VLfrmOV9S6aM71mECzrJmtL1c/kNh1QnueNtS3jNtYHq/27XTlBs2LhqDbEgzRPrAdVb5CbM6K8qgmWtVMMu9B6/VL3KQ8MmzqLonkr1kgheNZ11rjx7GbHqm5lzaheGa5ZY9YUDlgL1syg8qxYiN+ErqE91iRrSGp8hcpyw0qMd8iqGa9RgmW9IjexQ3l+szXl4UKB16u8Im5ZUzI+Yi2p3m8IlhUXByZ0G99vZoF3b80CcPhz1rJtNEiwrF3kmrj6LXmbpfl5XJA7/KxtNECwrHgEWHNXjU/pZx+kbpYDDr0oY3xNp1WvLEGz6svBg9eOZ5BSFpHzdqyZgT60B4dPjFdEsKyvYqZJg1fSvqrxHLRzsjhjzVtTuCT3DC1DsKw9YqTpRc3z3JHrIQA++bx3siaxhgH/z0U0K2skEolE/hRfLAO27U29bKgAAAAASUVORK5CYII=>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAUCAYAAADhj08IAAABCElEQVR4Xu2VTQ7BQBiGR8RKSAixYWNDnIJrOAUSCyGxwAXsrERi4whO4SQWEn/xE94vnZH201ZnIrrQJ3mi836zeOlUhYiI+A1tuII1ua7CJWy9doTEGD6YG8eOkBjCKVzAAYw7x+FBZRo8DEiTB4wETPEwKH1hXqwAdzyUJOGFhzr04ERYZ2suP2eOHf4U4Z5lVOrKMm06cM0yKjdimR8leJDXVOpmm30V9XTqoMp9rVSMB+Au9ItlhXX7TnxgChXYumQ6xVQpIgePtpkxVKDrkgUtlhHvB53KqTNnDH27vG1dF1apii3zIg3PPJRQOf60akO3Uv1KZNk59uTT+5T+XKlgxH/yBHtcNbTTmwF8AAAAAElFTkSuQmCC>

[image11]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAXCAYAAABwOa1vAAAB6UlEQVR4Xu2VMUgXYRjG3zS0IUpBXDQICwpcAscGh0IcAkFCRdHFySItaHHQtUUHodpCcLChICfBclEs1M1BBLHFaoigGhQlonxe3+/kvcfvfwe6yf3gx/E97/P/OO7ufydSUHD2eAoHOAz8hr2wGl6G9+GvVMO4DlfgfzhPsyy0Pw77YQ/sgp3BJteT1/CP2A/UB37oSObe+lRDpDnkCbdonQXv7W1zvRR5J/wMvoR3aJagHb5DejGWKWMa4QexK3kDXoMNsAWuud4x8k44i1qxjh4970OexbDYY8bk/e5UJzwq8c6kxPM8vsJLHDJ5J7wJ1+En+Beed/OZ0GFeSDzPogMucBhDN37IYUBnlW49G7KERVonTIjldTzIQPtlHMbQ4iMOS3BTrD8S1tNhzTwXy/3dyOKexPeJosVBDgPltNYroP2NsC71DL+SeF4K7f7jsBRafswh2BKbXXDZxZAthfXtsD7JW8Kj3bzX4BFafsIh2Ia7lLWK9btdput2t1Z24E/K9LGroEypEtvjHQ9i1IiVx3gArsDPlO3DPcrmxN4eCefE9rzqsuTrF7vq+jnWfIoHnjfwh9h770s4fhf7Qnn6xDb7Fo4f0+Mj9Mukd+OtWO9uenzIqtifi0k+PkM8KCgoKMjnALVqhlwV2cYmAAAAAElFTkSuQmCC>

[image12]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAYAAADUUxW8AAAA30lEQVR4Xu2SPQ4BQRzF/z4ajYuQaJxA5SQaQuUGOoV7aBQSjdBLJLiAkgYh4iNCeLMzs2aeJdHvL/klO+/t7MxkViSmBudwAWcw79cBUziCAy4sT+OVC5CFJ7jmwnKEd9EfSFGn2HNgKcAmLImePPbrAJVH0pP3anb7zIQDi/tyx4zrTlaBZWfswefh1VfOs0cC9injyVHHCGjAYkSmJrTN+OZ0HjsODHb1HGxRF/JtS0PR3RJmqAtIi/7tokjK59lD1L1u5Mf9gTO8cNiFB7gVfU0Pvw5Rf16Vw5g/eAFYLTaYStM1ZQAAAABJRU5ErkJggg==>

[image13]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAWCAYAAABUpxX0AAABJ0lEQVR4XmNgGAWjYHiDeUD8GYj/Q/ECFFkI+MuAkAdhZ1TpgQPIjsIG9gGxCrrgQAJGIN4OxOsZII4OQpUGA1yeIQYcRRegBsgHYhMoG1do/0EXIAGcQBegBniLxP7AAHE0H5KYGhB3IvFJBWfQBagBkEMWlG5B/JtIYsuAmAeJTyo4iy5AKQCl581oYuhJBFtyIQVQ3dHI6RlZDOTQbij/F5IcPsDJADELHV/HIgbDZIF36AJQAAttbSBuQZPDBQSA2A8LvoNFDIbJAriifjcDRO4eAyQEKQFUTR4sQLwXXRAKmBgw0za5gGqOZgbiN0B8El0CCXwD4u/ogmQAqjh6FRB/ZICUz6ByGdS2wAb0gTgbXZAMQBVH0xsMSUeD8scoGAW0AgCAD0Q182CQHQAAAABJRU5ErkJggg==>

[image14]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAXCAYAAABUICKvAAACqElEQVR4Xu2XS6hOURTHlzziiggDdblGigyuMPDIwEySUEooRVK6kkSKJAOJkaREDGQgM2WkCJFX8goDj4k8hijPPNb/22t9Z31/e3/X5DM6v1rd8/+v9e19ztl7n72vSE1NTc3/Y7fGR43PGuso1x/nNH5rPNHoolxklcY3SbWbKOeM0HghqeYe5ToKbv5i0I81rgddYrCkm51oeqDp8c2Kincat4LGC58dNFgr6fdoF+zR+NDMdpCRkjpm4I1ik7im8Zq8Q/J3e1fJW2p6e/DGmTc0eNDcVgtTNCawmWEAG8R9yXcE7wSbBGqOkjfH/Aj0GvKmk849cHFpTZJU/EvS+sX1hlgQGKYxk00i1zko+Y5P/V3k95i/zPR+02MkDchi8xnUPLJrLBN8G4rg4ZnLGj80usn/QjpH6WFLvtMrKb+VfJ/WO0y/N92nsVrS7P2qccPyALMaNWc0HmgM1zhiXpaFbBh40z+lunnEvJaKPKWHLfnOAkn5zeSPNv+4aW/nSrMizQh4y02vNM39YcD/ZSCzDGKjDbnOQcl3JkvKbyF/rPn7THs7qI/E9hfZ9Zsq3eCS+VkOSNUI9uh2zGeDKD1syXd8NHeSj+kOH2cC8Mo0E9vvsevTVbrBefNnkS83pXrL4JikQv8QRbAuh7BJfJLyTT5lk0BNaXfws4IPGBNfguuzQYML5vMsauzDOfBlxQ+2aSyRdOB51lKRZ4WUb3JG0Ni/+ZSHNfuQPOz9sT2fMfzRhveS9POgQWn7bjuyOPicknQCXE+5dqCjjUEfNC/iIzc1ePjw5uoOk4cZ9TbouZLqsM0608yLQO8lr2PgPIEOb0vaorCF8SELs+sOecBHHlP5u8bJ1nSTu5LqcFzGX+wiDLZR5Px/B5wxampqampq+uEPTljHMjaiyooAAAAASUVORK5CYII=>

[image15]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAXCAYAAABUICKvAAACn0lEQVR4Xu2WS6hOURTH//II5XkZEO4dSJFCDCSPMpEipZgYkmchidRVwkSMKCViYiIDZWJADKREyZuRgSRl4FWIPNbf2vv71l7f3udmcO9o/2r1nfXb6ztnn3322WcDlUqlMnAclPgs8VVio2vri8sSfySeS4x0bZFT0JpfEsddW2S8xFto3SuJMWlz/8LOXzf5U4k7Ji8xFNrhaSEfHPJJrQrlm0SPyVnDsAyDDkBkELRmnnH9xmh0dojQjfXScVvijXMnkJ6PN8f8i3FXgtti3EdzHJkNnTlFZkpM9TIDR7SJhygPwjkvHaw57dyi4C3M75n8WnCrjWO+zeRkTvAd9EAbfkPfXx5vtgWGERILvHTw/7kLlXwkTv1e57uDX+u8JXfuD8HdMI6zY4nJW/DmPbckfkpMcZ7vYl/kOkRKPjIX2r7H+YnB73c+chXa7he9OKgxOACrkgrDSi8CXdD3x55ocVKRp3SzJR9ZDm3f6fy44M86vxD6hXgh8QC6VngmI+3/s7T5/xjiRQOlmy35yAxo+27nJwR/xHnLTWgNayMr0J65y9C+/qNWheMY2kX8Rjex1AtH6WZLPhI/YQec52JNv8F5y3x0nj93rdfIe9xFOspnoIW5hYjvZW7aWfjpyl2IjlO3CdaUvg5xr7A95KNaFYodhHXm2EPPVymB3+EcT6B/2CuxBrrheZlU5FmPfAfo+MQiwyV2mJxwkX7s3D50PmHGIeOmG0+4Icr1gWR905PlxucCdAe4ybU1wQttNTm3tf7isdOzjOPCm6s7afJdEu9MTviAWNdtHPPDJifMuY8ZELifYCe4oeFC9B2dmyzOrvvOkfjkL0n8kDifNv/jKLTmffjlDMpt9D5B2zmD+Xsxba5UKpVKJcdf3WfDKXSM85AAAAAASUVORK5CYII=>

[image16]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAYCAYAAABqWKS5AAABNUlEQVR4Xu2VPUsDQRRFHxoRkYCmFGwUS/E32PkHRBNB01unkBRR7GwUtFP8LC3SaGlrYxMIhJQpba1sBL2XGdfx7SzZNJsp5sBhyX1vwyW72RWJRCKhMA+/YRPWYQ1uwy3rdLIZILtiymdZ+lsNj0e4B9fgClyGS7ANq85ekHzqACzCvg5X4TWctZ/L8BCewQmbhQBvl3/wxn+GO2KGx/DWzlo2C4EOXNfhiz3+lj9yZrwCecpz7yHDe3gHb8Rc3St4aU7LzaRk9GjYY0/SC/uebBy8wYEOXVjyVWUfNh837HCiQxcubHiyA5X54P+GXz6KeVkQf7cEvrH0L7zpZBV44cyK5FRMDz7vvXQlXf7Jyd7dQcHwuc4efEF5+YLnKpsScxKdU7MiYS92mNGDSCQSiQzlB2+qSikQFsb0AAAAAElFTkSuQmCC>

[image17]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAYCAYAAABnRtT+AAAB3UlEQVR4Xu2WPShGURjHn3xFMsgkA4PBQskiLBbKRBIZpUjJJjEpi42U1cciFptBmXwtBqVEyaZMPkI+8vU87zmHe//vOfc97+19y+BX/7rn//zvc8899973vET//F260fCkBo1sscZqQdOTI1YtmjbmWPesL61n1g14Gz/pMB2sbTTTRPoXo+nCTAipJOXbJmPLp0sb6wlNF3LBQzQ1thuYZB2DFxfpXYEm0kcq2I4Fpojsk5RxI3hxkXdzD03klJInYdgkVesE35U3DLJmWQV6PMJa/C2HMIsUiW2lhFZS/jz48sHY8oZ3Vh6rlFTuklXFGtU1G1H9EphJ3rFuWS96fMIqC+QM0+RuesUqDIwlJ0/DHJ8FakFc/RKYpR7AQgQr5G46FjjOJZWr1uPg5BHJOevn5L6giyXyO2ec/HKC5ErQNJhHnQ4T5HfOI/nlhMicFC/QTEEXuZvK+7yqjyUT3K16yP2z5epHU6SKQ1jwwNa0nJTfz+rVx8u6lkNqZW3IH5SkfgusB1JfsuzTsi19hhKpkaYNaDLXFJ7cqx67djPhgKLrsdli7aMZE7mJfDQzRdIjikEz6w3NTDLDWkczTT5I7U5ZZZdVh6YnO6x6NLPFMBqeNKHxT6b5Bguyef6kfJsXAAAAAElFTkSuQmCC>