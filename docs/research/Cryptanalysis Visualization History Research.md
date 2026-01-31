# **The Evolution of Cryptanalysis and Visualization: From Mechanical Logic to Digital Agility**

The trajectory of cryptanalysis over the last century represents a fundamental shift in the human ability to visualize, reason about, and manipulate abstract information. From the manual, paper-based systems used in the early 20th century to the sophisticated electromechanical machines of the Second World War and the modern digital era, the core challenge has remained constant: the reduction of uncertainty. This report provides an exhaustive investigation into the historical evolution of cipher visualization, focusing on the cognitive and mechanical strategies employed by codebreakers at Bletchley Park, the transition to electronic computing, and the enduring influence of these methods on contemporary digital security and cultural memory.

## **The Mechanical Foundation: The Enigma System and Its Variants**

The Enigma machine, an electromechanical device utilizing rotating wheels to generate a polyalphabetic substitution cipher, served as the primary instrument of German military secrecy.1 To understand the visualization strategies required to break this system, one must first analyze the mechanical logic that defined its complexity. The Enigma operated on the principle of a continuously changing electrical circuit; with every keystroke, the rotors moved, altering the path of the current and ensuring that a single plaintext letter could be represented by any of the 26 letters of the alphabet in a cycle that did not repeat for over 17,000 characters.2

### **Mathematical Complexity and Permutations**

The perceived unbreakability of the Enigma was rooted in the astronomical number of possible settings available to the operator. By the height of the Second World War, the German military had introduced several enhancements, most notably the plugboard (Steckerbrett), which significantly multiplied the scrambler's permutations.1

| Enigma Component | Variation Type | Statistical Contribution |
| :---- | :---- | :---- |
| Rotor Selection (Walzenlage) | 3 rotors chosen from a set of 5 or 8 | 60 to 336 combinations |
| Rotor Positions (Grundstellung) | 26 possible starting positions per rotor | 17,576 combinations |
| Ring Settings (Ringstellung) | 26 possible internal wirings per rotor | 17,576 combinations |
| Plugboard (Steckerbrett) | Swapping 10 pairs of letters | 150,738,274,937,250 |
| **Cumulative Strength** | **Total Combined Settings** | **\~1.58 x ![][image1]** |

The plugboard was exclusive to military models and served as a powerful defense against simple frequency analysis.1 By swapping pairs of letters before they entered the rotor bank and after they exited, the Germans added a layer of transposition that made the visualization of the internal rotor state nearly impossible without first determining the plugboard connections.4

### **Evolution of Enigma Models**

The Enigma was not a single, static machine but a family of devices that evolved to meet specific military and intelligence needs. The Bletchley Park codebreakers were forced to adapt their visualization tools as each new model introduced different mechanical constraints.1

| Model Name | Primary User | Distinctive Features |
| :---- | :---- | :---- |
| Enigma D | Italian Navy/Mussolini | Early commercial model (1926); settable reflector; captured in 1945\.1 |
| Enigma I | German Army/Air Force | First model to use a plugboard; standard three-rotor system.1 |
| Enigma M4 (Shark) | German Navy (U-boats) | Four rotors; introduced Feb 1942; used 3 moving and 1 non-moving rotor.1 |
| Enigma G (Abwehr) | German Intelligence | "Zählwerk" system; used cog-wheels; reflector moved during encipherment.1 |
| Enigma T (Tirpitz) | Japanese/German Liaison | Based on Enigma K; scrambled entry disc; no plugboard but more rotor notches.1 |

The Enigma G, nicknamed the "11-15-17 machine" at Bletchley Park due to its high number of turnover positions, presented a unique challenge because the movement of the reflector during encipherment created a much more complex rotor movement than the standard military models.1 The Enigma M4, known to the Allies as "Shark," caused a nine-month blackout in communications starting in 1942, illustrating how a seemingly small mechanical change—adding a fourth rotor—could collapse existing visualization and decryption systems.1

## **The Industrialization of Cryptanalysis: Bletchley Park Ecosystem**

Bletchley Park, also known as Station X or BP, represented the transition of cryptanalysis from a bespoke academic activity to an industrial-scale operation.6 The site was organized into a series of wooden huts and, later, reinforced concrete blocks, each serving a specific role in the information value chain.6 This organizational structure was essential for managing the volume and velocity of data, which reached 3,000 to 5,000 messages daily by the end of the war.8

### **Functional Specialization by Huts and Blocks**

The division of labor at Bletchley Park was a masterclass in information management. By separating the technical act of cryptanalysis from the intellectual act of intelligence synthesis, Bletchley created a highly efficient "intelligence factory".9

| Building | Primary Function | Specific Responsibility |
| :---- | :---- | :---- |
| Hut 6 | Cryptanalysis (Army/Air) | Breaking German Army and Air Force Enigma ciphers.6 |
| Hut 8 | Cryptanalysis (Navy) | Breaking German Naval Enigma (Shark, Dolphin).6 |
| Hut 3 | Intelligence (Army/Air) | Translation, analysis, and synthesis of Hut 6 decrypts.6 |
| Hut 4 | Intelligence (Navy) | Analysis and processing of Naval Enigma decrypts.6 |
| Block C | Data Management | Stored substantial punch-card indexes for tracking personnel and units.6 |
| Hut 11 | Bombe Operations | Housing the electromechanical machines used for decryption.6 |
| Block H | Computing | Home of the Colossus machines for breaking the Lorenz cipher.6 |

Hut 6 and Hut 8 were the centers of the "Probable-Phrase Attack," where mathematicians and linguists worked to identify "cribs"—guessed fragments of plaintext—that could be used to unlock the daily keys.4 The intelligence gathered was classified as "Ultra," a term used to denote its high strategic value and the extreme secrecy required for its protection.16

### **Information Flow and the Y Stations**

The cryptanalytic process began far from Bletchley Park at the "Y Stations," which were signals intelligence collection sites located across the United Kingdom and overseas.17 Intercepted Morse code signals were transcribed and transmitted to Bletchley via teleprinter.17

The physical artifacts of this process—message transcripts—served as the primary visualization tool for the codebreakers. Each transcript included a "preamble" containing metadata: the sender's call sign, time of transmission, character count, and the "indicator," a group of letters that provided a clue to the specific Enigma setting for that message.17 Codebreakers would then use colored pencils to annotate these messages; for instance, Gordon Welchman famously used a red pencil to mark German Air Force messages, leading to their codename "Red".17

## **Manual Visualization Techniques: Banburismus and the "Ban"**

Before the mechanization of cryptanalysis reached its peak, manual statistical methods were developed to reduce the computational burden on the Bombe machines. The most significant of these was Banburismus, a process developed by Alan Turing in Hut 8 to tackle the German Naval Enigma.12

### **The Logic of Banbury Sheets**

Banburismus was a technique based on sequential conditional probability used to determine the starting positions of the right-hand and middle rotors.12 The method relied on "Banbury sheets"—long strips of paper printed with grids of letters, named after the town where the stationery was produced.14

Cryptanalysts would punch holes in the sheets representing the ciphertext of two different messages. By sliding these sheets against one another and observing where the holes aligned, they could count "overlaps".12 A higher-than-average number of overlaps at a specific offset suggested that the two messages had been enciphered with the same rotor settings starting from that relative position.12 This exploitation of coincidences is a direct application of the "Index of Coincidence" developed by William Friedman in the early 20th century.20

### **The "Ban" as a Measure of Evidence**

Turing's most profound contribution to the visualization of probability was the invention of the "ban" and the "deciban".12 A "ban" was defined as the amount of evidence that makes a hypothesis ten times as likely as it was before. This logarithmic unit allowed codebreakers to add up the "weight of evidence" from different message pairs to reach a statistical threshold for a "break".12 This concept of measuring the weight of evidence was later applied to "Turingery," a method used for breaking the more complex Lorenz cipher.19

| Unit | Mathematical Basis | Practical Application |
| :---- | :---- | :---- |
| Ban | ![][image2] of the odds ratio | Measuring total evidence for a rotor setting.12 |
| Deciban | 0.1 Ban | Smallest unit of evidence perceptible to an analyst.19 |

This system allowed analysts to reason about probability in a structured way, transforming the intuitive "hunch" into a quantifiable mathematical value. The Banbury sheets recently discovered in the walls of Hut 6 are the only surviving physical examples of this manual visualization era, having been stuffed into the cracks of the drafty wooden building by cold-shivering cryptographers.14

## **Mechanical Logic and Automated Deduction: The Turing-Welchman Bombe**

The British Bombe was an electromechanical masterpiece designed to automate the search for Enigma rotor orders and starting positions.5 While based on the earlier Polish *Bomba*, the British version featured a revolutionary logical refinement: the diagonal board, devised by Gordon Welchman.8

### **Cribs, Menus, and the Diagonal Board**

The logic of the Bombe was centered on the relationship between a "crib" (guessed plaintext) and its corresponding ciphertext. Because the Enigma machine had a fundamental design flaw—no letter could ever be enciphered as itself—cryptanalysts could use this "exclusion principle" to find potential locations for a crib within a message.4

Once a crib was aligned with the ciphertext, a "menu" was constructed. A menu was a graphical representation of the pairing relationships between letters at specific relative positions.4

1. **Loops of Implications**: Codebreakers sought "loops" in the menu where a sequence of encipherments returned to the starting letter (e.g., A enciphers to E, E to B, and B back to A at different positions).21  
2. **The Diagonal Board**: The diagonal board acted as a massive electrical switchboard that interconnected all 26 possible plugboard (Stecker) hypotheses for every letter. This allowed the machine to test a hypothesis (e.g., "A is connected to G") and instantaneously propagate the implications through the entire menu.4  
3. **Contradiction Sensing**: If a hypothesis led to a logical contradiction (e.g., the machine deduced that A must be connected to both G and T simultaneously), the electrical circuit would remain closed, and the machine would continue to run.4  
4. **The "Stop"**: When the machine reached a configuration where no contradiction was found—meaning all constraints of the menu were satisfied—the circuit would open, and the machine would "stop".21

The Bombe checked 60 possible rotor orders and 17,576 positions for each, looking for configurations that could satisfy the plugboard settings.3 High-speed "Keen-type" machines introduced in 1943 could complete a full three-wheel run in just one and a half minutes.8

### **The Role of the Bombe Operators**

The operation of these massive machines—each weighing over a ton and containing miles of wiring—fell largely to the Women's Royal Naval Service (WRNS).8 By 1945, there were 1,676 "Wrens" and 263 male RAF personnel operating 211 Bombes.8

Operators like Jean Valentine, who was recruited at 18, lived in a world of high pressure and intense secrecy.15 Their task was to set up the machines according to the "menus" provided by the cryptanalysts and record the "stops" for further checking.8 The work was industrial in scale; the Bombes handled 36,002 "jobs" by the end of the war, with an efficiency rate of 97.6%.8 Operators were trained to manage the "cognitive load" of these tasks, often working shifts at "out-stations" like Eastcote and Stanmore to protect the main Bletchley site from air raids.8

## **The Dawn of Digital Visualization: Colossus and Information Theory**

While the Enigma was an electromechanical problem, the Lorenz (SZ42) cipher used for German high-level strategic communications required a leap into electronic computing.6 The Lorenz cipher was a teleprinter attachment that used 12 wheels to generate a stream of pseudorandom bits, which were then combined with the message bits using an XOR logical operation.6

### **Colossus: The First Programmable Computer**

To break the "Tunny" (Lorenz) traffic, Tommy Flowers and his team at the Post Office Research Laboratories built Colossus in late 1943\.6

* **Vacuum Tube Logic**: Colossus used 1,500 (later 2,500) vacuum tubes to perform logical operations at a speed of 5,000 characters per second.6  
* **Statistical Analysis**: The machine was used to find the "chi" wheel settings of the Lorenz machine by counting the frequency of bit combinations in the data stream.10  
* **Electronic Visualization**: In the Colossus era, visualization moved from the physical (paper and drums) to the electronic. Codebreakers looked at the outputs of the machine to identify statistical "peaks" that indicated the correct wheel positions.10

The destruction of the ten Colossus machines immediately after the war ensured that its revolutionary technology remained a secret for decades, delaying the public's understanding of the origins of the digital age.6

### **Claude Shannon and the Science of Secrecy**

Coinciding with the hardware breakthroughs at Bletchley Park, Claude Shannon at Bell Labs was developing the mathematical foundations of modern cryptography.25 In his 1945 paper, "A Mathematical Theory of Cryptography," Shannon identified the two main goals of a secrecy system: secrecy (confidentiality) and authenticity.25

Shannon's work introduced the concept of "Information Theory," which treated cryptography as a communication problem.25 He defined "Perfect Secrecy"—a state where the ciphertext provides zero information about the plaintext—and proved that only a "One-Time Pad" can achieve this.25 This shift from cryptanalysis as an "art" of linguistic patterns to a "science" of mathematical entropy is the defining transition of the mid-20th century.25

## **Evolution of Cryptography: 1970s to 2025**

The post-war era saw the rapid expansion of cryptographic tools from the military to the commercial sphere, driven by the needs of businesses to secure data from competitors.26

### **The Standardization Era: DES and AES**

In the 1970s, IBM developed a block cipher called "Lucifer," which evolved into the Data Encryption Standard (DES).26 DES used a 56-bit key and was adopted by the U.S. government in 1976\.20 However, as computing power increased, DES became vulnerable to brute-force attacks and was eventually broken in 1997\.27

In 2001, the Advanced Encryption Standard (AES) replaced DES as the global standard for bulk data encryption.26 AES is a symmetric-key algorithm that remains highly secure today, with key sizes of 128, 192, and 256 bits.20

### **The Public Key Revolution: RSA and ECC**

The 1970s also witnessed the invention of asymmetric (public key) cryptography, which solved the "key exchange" problem.20 Whitfield Diffie and Martin Hellman published "New Directions in Cryptography" in 1976, followed by the invention of the RSA algorithm by Rivest, Shamir, and Adleman in 1977\.20

| Algorithm | Year | Primary Innovation | Security Basis |
| :---- | :---- | :---- | :---- |
| RSA | 1977 | Public/Private Key pairs | Difficulty of factoring large prime numbers.28 |
| ECC | 1985/90s | Greater strength per bit | Complexity of elliptic curves; more efficient for mobile.28 |
| BB84 | 1984 | Quantum Cryptography | Uses quantum states (qubits) to secure communication.20 |

### **The Future: Post-Quantum Cryptography (PQC)**

As we approach 2025, the rise of quantum computing poses a significant threat to modern asymmetric encryption. Algorithms like RSA and ECC can be broken by a sufficiently powerful quantum computer using Shor's algorithm.20 This has led to the development of "Post-Quantum Cryptography" (PQC)—algorithms designed to be secure against both classical and quantum computers.28

The industry is currently moving toward "cryptographic agility," which allows systems to adapt to new standards quickly.28 This is exemplified by the transition from older hashing algorithms like SHA-1 to more secure versions like SHA-2 and SHA-3, after weaknesses were found in the earlier designs.28

## **Cultural Representation and Historical Historiography**

The history of Bletchley Park has entered the public consciousness through films, documentaries, and novels, which often prioritize narrative drama over historical precision. This has created a "mythology" of codebreaking that sometimes obscures the reality of the work.9

### **The "Lone Genius" vs. Industrial Scale**

The 2014 film *The Imitation Game* is a primary example of this cultural distortion. While it brought Alan Turing's story to a global audience, it significantly altered key historical facts.30

| Feature | Film Representation (The Imitation Game) | Historical Reality |
| :---- | :---- | :---- |
| **Alan Turing** | Portrayed as a socially isolated, almost autistic genius.30 | Had many close friends and a sharp sense of humor.31 |
| **The Machine** | Named "Christopher" after a late childhood friend.22 | Named "Bombe," after the Polish *Bomba*.22 |
| **Collaboration** | Suggests Turing singlehandedly built the machine.30 | Collaborative effort with Gordon Welchman and Polish foundations.22 |
| **Joan Clarke** | Recruited via a crossword competition in a newspaper.30 | Recruited by her academic supervisor, Gordon Welchman.30 |
| **Military Brass** | Commander Denniston is depicted as a hostile antagonist.30 | Denniston was supportive and eager to recruit Turing.31 |

The film also invents a plotline where Turing is investigated as a Soviet spy, which never happened.22 In reality, the real Soviet spy at Bletchley Park, John Cairncross, worked in a different unit and never met Turing.30

### **Documentary and Interactive Storytelling**

Beyond fiction, documentaries like *The Codebreaker* (about Elizebeth Smith Friedman) provide a more nuanced look at the role of women in cryptanalysis.33 The concept of "interactive documentary" (i-doc) is emerging as a tool for sustaining cultural heritage, allowing audiences to engage with the material rather than just observing it.34 This is particularly relevant for Bletchley Park, where the story is increasingly deploying symbols of "British exceptionalism" and social progress, particularly regarding the role of women in wartime industry.9

## **Findings: The Evolution of Visualization and Reasoning**

The investigation into the history of cryptanalysis reveals a clear evolution in how humans visualize and reason about secret information.

1. **Reduction of Uncertainty**: Whether through the physical alignment of Banbury sheets or the logical propagation of signals in the Bombe, the core of cryptanalysis is the systematic elimination of impossible settings.4  
2. **Visualization of Probability**: The invention of the "ban" allowed for the quantification of evidence, transforming a linguistic problem into a statistical one.12  
3. **Human-Machine Interaction**: The role of operators like Jean Valentine highlights that the machines were not autonomous; they required precise human calibration and a high tolerance for repetitive, high-pressure tasks.8  
4. **Technological Agility**: The German failure to realize that Enigma had been broken was rooted in a lack of agility—their conviction that the machine was "unbreakable" blinded them to the possibility of mechanical and procedural exploitation.2  
5. **Information Science Legacy**: Bletchley Park was an early practitioner of what we now call "Big Data" and "Knowledge Management," using punch-card indexes as an organizational memory to track high-velocity data.10

## **Declassified Evidence: The National Archives (HW Series)**

For researchers seeking to verify these findings, the National Archives (TNA) in the UK holds the declassified records of the Government Code and Cypher School under the department reference **HW**.7

* **HW 3**: Correspondence and working papers on the history of signals intelligence.7  
* **HW 7**: Official intelligence histories of the First World War.7  
* **DEFE 3**: Decrypted signals from German, Italian, and Japanese radio communications.16  
* **Ultra**: The code name used for high-grade signals intelligence derived from Enigma and other machines.16

These records reveal that the work at Bletchley Park was not just a collection of "eureka" moments, but a sustained, industrial-scale effort involving thousands of unsung personnel, rigorous statistical discipline, and the pioneering use of electronic computation.9

## **Conclusions**

The transition from the manual visualization of the 1920s to the digital agility required in the 2020s underscores a broader historical trend: the virtualization of the battlefield. In the Second World War, the "visualization" of the enemy was achieved through the mechanical simulation of their encryption machines. Today, that visualization is achieved through the monitoring of network telemetry and the algorithmic detection of cryptographic weaknesses.

The legacy of Bletchley Park is not merely the development of the computer, but the development of a *way of thinking*—a method of reasoning that uses logic, probability, and machine speed to pierce the veil of secrecy. As we enter the post-quantum era, the ability to adapt our cryptographic tools with the same speed and ingenuity as the codebreakers of Hut 6 and Hut 8 will remain the primary guarantor of digital trust. The cultural representation of this history, while often inaccurate, serves as a vital bridge for public engagement, though the true story—one of industrial collaboration, statistical brilliance, and the tireless work of thousands of operators—is far more complex and significant than the myth of the lone genius.

#### **Works cited**

1. Enigmas of Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/enigmas-of-bletchley-park/](https://www.bletchleypark.org.uk/our-story/enigmas-of-bletchley-park/)  
2. Enigma | Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/enigma/](https://www.bletchleypark.org.uk/our-story/enigma/)  
3. Enigma machine \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Enigma\_machine](https://en.wikipedia.org/wiki/Enigma_machine)  
4. The Turing Bombe \- Cribs and Menus \- Graham Ellsbury, accessed December 28, 2025, [http://www.ellsbury.com/bombe1.htm](http://www.ellsbury.com/bombe1.htm)  
5. Bombe \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Bombe](https://en.wikipedia.org/wiki/Bombe)  
6. Bletchley Park \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Bletchley\_Park](https://en.wikipedia.org/wiki/Bletchley_Park)  
7. new-chat Archives \- The National Archives, accessed December 28, 2025, [https://www.nationalarchives.gov.uk/category/new-chat/](https://www.nationalarchives.gov.uk/category/new-chat/)  
8. The Turing-Welchman Bombe — The National Museum of Computing, accessed December 28, 2025, [https://www.tnmoc.org/bombe](https://www.tnmoc.org/bombe)  
9. Full article: Female labour at Bletchley Park: reality and (romantic) fiction, accessed December 28, 2025, [https://www.tandfonline.com/doi/full/10.1080/02684527.2025.2506282](https://www.tandfonline.com/doi/full/10.1080/02684527.2025.2506282)  
10. Bletchley Park : an untold story in Information Science, accessed December 28, 2025, [https://eprints.whiterose.ac.uk/id/eprint/189316/1/ASIS%26T%20EC%20IST%202022%20BP\_Final-short.pdf](https://eprints.whiterose.ac.uk/id/eprint/189316/1/ASIS%26T%20EC%20IST%202022%20BP_Final-short.pdf)  
11. E168 – Inside Hut 6 | Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/e168-inside-hut-6/](https://www.bletchleypark.org.uk/our-story/e168-inside-hut-6/)  
12. Banburismus, accessed December 28, 2025, [https://grokipedia.com/page/Banburismus](https://grokipedia.com/page/Banburismus)  
13. A dramatic plea for Churchill's help from Bletchley Park \- The National Archives, accessed December 28, 2025, [https://www.nationalarchives.gov.uk/explore-the-collection/stories/a-dramatic-plea-for-churchills-help/](https://www.nationalarchives.gov.uk/explore-the-collection/stories/a-dramatic-plea-for-churchills-help/)  
14. Codebreaking notes, Banbury sheets found in Bletchley hut – The ..., accessed December 28, 2025, [http://www.thehistoryblog.com/archives/34725](http://www.thehistoryblog.com/archives/34725)  
15. Jean Valentine (bombe operator) \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Jean\_Valentine\_(bombe\_operator)](https://en.wikipedia.org/wiki/Jean_Valentine_\(bombe_operator\))  
16. Intelligence and security services \- The National Archives, accessed December 28, 2025, [https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/intelligence-and-security-services/](https://www.nationalarchives.gov.uk/help-with-your-research/research-guides/intelligence-and-security-services/)  
17. Enigma Red messages | Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/enigma-red-messages/](https://www.bletchleypark.org.uk/our-story/enigma-red-messages/)  
18. New to the Archives | Bletchley Park, accessed December 28, 2025, [https://www.bletchleypark.org.uk/our-story/new-to-the-archives/](https://www.bletchleypark.org.uk/our-story/new-to-the-archives/)  
19. Banburismus Cryptanalytic Process \- Alan Turing, accessed December 28, 2025, [https://turing.academicwebsite.com/projects/13-banburismus-cryptanalytic-process](https://turing.academicwebsite.com/projects/13-banburismus-cryptanalytic-process)  
20. Timeline of cryptography \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/Timeline\_of\_cryptography](https://en.wikipedia.org/wiki/Timeline_of_cryptography)  
21. BombeMachine \- School of Electrical and Computer Engineering, accessed December 28, 2025, [https://people.ece.cornell.edu/land/courses/ece5760/FinalProjects/s2022/az292\_kw456\_lh479/az292\_kw456\_lh479/index.html](https://people.ece.cornell.edu/land/courses/ece5760/FinalProjects/s2022/az292_kw456_lh479/az292_kw456_lh479/index.html)  
22. The Imitation Game True Story \- The Real Alan Turing, Joan Clarke \- History vs. Hollywood, accessed December 28, 2025, [https://www.historyvshollywood.com/reelfaces/imitation-game/](https://www.historyvshollywood.com/reelfaces/imitation-game/)  
23. Virtual Wartime Bletchley Park \- Tony Sale, accessed December 28, 2025, [https://www.codesandciphers.org.uk/anoraks/menus.htm](https://www.codesandciphers.org.uk/anoraks/menus.htm)  
24. Jean Valentine \- Women in Computing \- LGFL, accessed December 28, 2025, [https://wic.lgfl.net/home/meet-the-experts/jean-valentine](https://wic.lgfl.net/home/meet-the-experts/jean-valentine)  
25. History of cryptography \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/History\_of\_cryptography](https://en.wikipedia.org/wiki/History_of_cryptography)  
26. The History of Cryptography \- DigiCert, accessed December 28, 2025, [https://www.digicert.com/blog/the-history-of-cryptography](https://www.digicert.com/blog/the-history-of-cryptography)  
27. A Brief History of Cryptography \- Red Hat, accessed December 28, 2025, [https://www.redhat.com/en/blog/brief-history-cryptography](https://www.redhat.com/en/blog/brief-history-cryptography)  
28. The History of Cryptography: Timeline & Overview | Entrust, accessed December 28, 2025, [https://www.entrust.com/resources/learn/history-of-cryptography](https://www.entrust.com/resources/learn/history-of-cryptography)  
29. The Secret History of Cryptographic Evolution: NSA Influence, Algorithm Transitions, and the Road to Post-Quantum Security \- QuSecure, accessed December 28, 2025, [https://www.qusecure.com/the-secret-history-of-cryptographic-evolution/](https://www.qusecure.com/the-secret-history-of-cryptographic-evolution/)  
30. The Imitation Game True Story: Everything The Movie Changes \- Screen Rant, accessed December 28, 2025, [https://screenrant.com/imitation-game-true-story-every-change/](https://screenrant.com/imitation-game-true-story-every-change/)  
31. The Imitation Game fact vs. fiction: How true the new movie is to Alan ..., accessed December 28, 2025, [https://slate.com/culture/2014/12/the-imitation-game-fact-vs-fiction-how-true-the-new-movie-is-to-alan-turings-real-life-story.html](https://slate.com/culture/2014/12/the-imitation-game-fact-vs-fiction-how-true-the-new-movie-is-to-alan-turings-real-life-story.html)  
32. Reading Between the Frames: Awareness of Underlying Messages in Films – Voices of USU \- UEN Digital Press with Pressbooks, accessed December 28, 2025, [https://uen.pressbooks.pub/voicesofusuvol16/chapter/reading-between-the-frames-awareness-of-underlying-messages-in-films/](https://uen.pressbooks.pub/voicesofusuvol16/chapter/reading-between-the-frames-awareness-of-underlying-messages-in-films/)  
33. Watch The Codebreaker | American Experience | Official Site \- PBS, accessed December 28, 2025, [https://www.pbs.org/wgbh/americanexperience/films/codebreaker/](https://www.pbs.org/wgbh/americanexperience/films/codebreaker/)  
34. Digital Storytelling in Cultural Heritage: Audience Engagement in the Interactive Documentary New Life \- MDPI, accessed December 28, 2025, [https://www.mdpi.com/2071-1050/13/3/1193](https://www.mdpi.com/2071-1050/13/3/1193)  
35. “The Imitation Game” is a travesty | by Carne Ross | Medium, accessed December 28, 2025, [https://medium.com/@carneross/the-imitation-game-is-a-travesty-d57eb2994bc9](https://medium.com/@carneross/the-imitation-game-is-a-travesty-d57eb2994bc9)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAYAAACaq43EAAABX0lEQVR4Xu2VLUsEURSGjx/F4grazGKxGRf2F5jNgsUPFAWjFtPCbhCzxSAGf4JNsBhEwY9mUIuIRUVERH1f7r3DmbNzwjgGER94mHveO/eeWfburMgfogk/4QPsN3NH8BKum7wya7A3jkclPEDiGfbE8arKf4Qr+K5qNp5Q40R6gBwrcNaGCn6qR/gCp82chc0G4Ugcd7AL3yRM0rn8dMYF3Ff1GTxUtWYHHsdxXZzGGq8xD0rRYmYDJhuDB6oeluK1ObzGJ1K8mNmWqmtwW9WNeNVr0wHM4TVOX4NF513wHE5J+P43YXec02sn1TijSmMeulTb+/kAH3ADXqs8gzfP21A6N0p4eWm4yYINxW/g5aXhJos2FL+Bl5eGmyzZEDxJcQNmfP9Whhst21DCSfQaj9uwLEMSNmrbiQjnZlTditm32YP38BbexOudhNeopk9CI/69ncJXCb/df34vX5hJZVQ2imHtAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAUCAYAAAAHpoRMAAABhklEQVR4Xu2UzStFURTFt0IZUCQSSSYiycTAnHjl4z9QMjQ2MaCMFJkYKRMT/4DkL8BIZr4misgAyUQ+irXf2cdbtvsG9xm4yq9WnbXOvufue8+5V+SfP0a7D36DO+jdlAlaJUPNNEiGmqmTDDVTK8WbmYSuoA0JbzCJLmgdmjO/KGG9vs+KFCQ1U2nZMGVP0Cp55Rw6s3G/hGs6oH1oMxalIamZV+jYZeUS6prMD5hn1L+5LBW+mSrz45RFND+18bR5Rr3PUuGbmTA/SFmEb1Zm49HCdN4vkU+Nb6bXvB5ej39yHeu2PNp4heY82z4AQxI+EP355mmUsJA+aUT9FvmI5rPkT2hcjGUJW+63r0a+n0vplFBYT9mYZdWU7Un4ohitOYJ2oR1oDer5UlHAN3MATXHwDF1Dl9CN0OsCLdCtFLZmgeYiPM964CLDN6Oez9uPeIHmfQgqJNyo2eVJzeRcVjK6mP5rktA5/TP7zPsRl5VMt4QFZyhrg+6hQ8oivpkLoTPzAWIEaiRAuOr9AAAAAElFTkSuQmCC>