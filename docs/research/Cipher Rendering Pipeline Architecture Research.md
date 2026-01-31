# **Architectural Foundations of Modular Cipher Rendering Pipelines: Technical Frameworks, Design Patterns, and Implementation Strategies**

The engineering of high-fidelity, interactive cryptography visualization tools requires a sophisticated synthesis of computer graphics, state-driven software architecture, and pedagogical design. Traditional pedagogical approaches to cryptography often fail because they rely on static representations of dynamic, bit-level transformations. To overcome this, a modular cipher rendering pipeline must be constructed that facilitates the real-time visualization of data flow through complex encryption algorithms while ensuring architectural scalability, reproducibility, and cross-platform accessibility. Such a system necessitates a rigorous evaluation of modern graphics frameworks, the implementation of robust design patterns for logic decoupling, and the optimization of rendering paths to handle dense telemetry and complex state updates.

## **Graphics Framework Evaluation and Performance Crossover Analysis**

The selection of a graphics framework serves as the primary determinant for a visualization tool’s performance ceiling and development complexity. Modern browser environments offer several distinct pathways for rendering, each characterized by different memory management strategies and hardware utilization levels. The four primary contenders—HTML5 Canvas 2D, WebGL, Three.js, and Babylon.js—represent a spectrum from high-level, CPU-bound abstractions to low-level, GPU-accelerated interfaces.

### **Comparative Framework Trade-offs and Capabilities**

HTML5 Canvas 2D operates as a retained-mode API where drawing commands are sent to a rasterizer, typically executing on the CPU.1 Its primary strength lies in its simplicity and native support for complex text rendering and basic 2D primitives.3 For educational tools focusing on classical substitution ciphers or simple bitwise logic, Canvas provides an ideal environment for rapid prototyping and minimum viable product (MVP) development.3 However, Canvas is limited by its single-threaded nature; it redraws the entire scene for every frame change, which leads to performance degradation as the complexity of the visualization increases.3

WebGL represents a significant shift toward immediate-mode rendering, providing an interface based on OpenGL ES 2.0 that allows developers to execute vertex and fragment programs directly on the GPU.2 The massively parallel architecture of GPUs makes WebGL indispensable for visualizations that require thousands of moving elements, such as the flow of bits in a stream cipher or the diffusion effects in a block cipher.1 While WebGL provides maximum control, it introduces a steep learning curve involving matrix mathematics, buffer management, and the Graphics Library Shading Language (GLSL).3

Three.js and Babylon.js serve as sophisticated wrappers that abstract the complexities of WebGL into a scene graph architecture.5 Three.js is particularly well-suited for general-purpose 3D visualizations, data-driven animations, and interactive experiences.5 Babylon.js, while similar, often provides more robust features for complex 3D modeling and high-performance physics, making it a viable choice for intricate mechanical cipher simulations like the Enigma machine.5

| Framework | Rendering Backend | Optimal Use Case | Complexity | Scale Limit |
| :---- | :---- | :---- | :---- | :---- |
| **Canvas 2D** | CPU / Software Rasterizer | 2D Schematics, MVPs | Low | \<10,000 elements |
| **WebGL** | GPU / GLSL Shaders | High-density 3D, Custom Shaders | High | \>1,000,000 elements |
| **Three.js** | GPU / Scene Graph | 3D Interactive Dashboards | Moderate | High |
| **Babylon.js** | GPU / PBR Engine | Complex 3D Simulations | Moderate | High |
| **WebGPU** | GPU / Next-Gen Native | Extreme Compute/Render Tasks | Very High | 10M+ elements |

2

### **Crossover Benchmarks and Hardware Acceleration**

The decision to transition from Canvas to a GPU-accelerated framework like WebGL is typically driven by the "crossover point," a threshold where the overhead of marshaling data to the GPU is outweighed by the GPU's parallel processing speed. Research indicates that Canvas and SVG performance often falls below the critical 30 frames per second (FPS) mark when a visualization exceeds 10,000 elements.2 In contrast, WebGL can maintain 60 FPS for hundreds of thousands of vertices by utilizing instanced rendering and uniform buffers.2

Interactive latency is another critical factor. GPU-accelerated zooming and rotation can keep the latency from input to refresh below 8 milliseconds, which is essential for maintaining fluid interactivity in professional-grade tools.2 On modern hardware like the Apple M2, the integrated GPU can deliver WebGL throughput that is 30% higher than Canvas for moving-image benchmarks, although Canvas may still perform better in specific memory-bound transform tests.2 The emergence of WebGPU further extends these boundaries, with early builds capable of handling 10 million-point scatter plots at over 45 FPS on consumer-grade laptops.2

## **Architectural Modularity and Logic Decoupling**

To build a modular cipher rendering pipeline, it is imperative to decouple the cryptographic logic (the model) from the visualization state management and the final rendering output (the view). This separation ensures that new cipher types can be integrated without necessitating changes to the visualization engine, and vice versa.

### **The Pipes and Filters Pattern in Rendering**

A modular rendering pipeline can be effectively modeled using the Pipes and Filters architectural pattern.9 In this design, the cryptographic process is broken down into discrete processing steps (filters) connected by data channels (pipes).9 For a block cipher like AES, each round of transformation—including SubBytes, ShiftRows, MixColumns, and AddRoundKey—can be implemented as an independent filter.9

This decoupling allows each filter to transform the data state independently before passing it to the next stage.9 The modularity of this approach facilitates parallel processing, as different filters can be distributed across hardware resources if the pipeline logic permits.9 Furthermore, promoting the rendering process to a first-class "scene element" within this pipeline enables advanced techniques like recursive or nested rendering, where a sub-pipeline might render a mini-visualization inside a larger scene.11

### **Domain-Driven Design and Modular Monoliths**

Organizing the visualization tool as a collection of loosely coupled domain modules—based on specific cryptographic subdomains like asymmetric protocols or classical substitution—improves team autonomy and system maintainability.12 Encapsulating the implementation details of each cipher module behind a stable, facade-style API reduces design-time coupling.12

For example, the Cryptographic Protocol Animator (CPAnim) uses a scenario-based approach to separate the mathematical execution of a protocol from its behavioral display.13 This allows users to specify a protocol scenario in a file and playback the execution by re-running previously executed scenes.13 By maintaining this separation, the underlying cryptographic libraries (e.g., Libsodium, TweetNaCl) can be treated as swappable dependencies within a larger modular framework.14

## **Real-Time Interactive Simulation and Temporal Control Patterns**

A high-performance cryptographic visualization must provide users with the ability to navigate time—to play, pause, rewind, and step through the algorithm’s execution. Implementing these temporal controls requires a sophisticated approach to state management that ensures reproducibility and state consistency.

### **State Machine Management for Game Flow**

Managing the "game flow" of an interactive simulation is best handled through Finite State Machines (FSMs).16 An FSM manages state changes explicitly, reacting to external events such as user input or simulation triggers.16 A common pattern for interactive control involves a hierarchy of states where an "In Progress" superstate encapsulates more specific "Running" and "Paused" substates.18 This structure ensures that events like "Pause" or "Resume" only affect the active substate, while global events like "End" can trigger resource cleanup and transition the system back to an "Initial" or "Stopped" state.18

### **Command and Memento Patterns for Temporal Navigation**

To facilitate the "rewind" and "step" functionality, the system must be able to revert to previous states accurately. There are two primary established patterns for this:

1. **The Memento Pattern:** The entire state of the system is serialized and pushed onto an undo stack before every change.19 To undo an action, the top memento is popped and used to replace the current state.19 While simple to implement, this is memory-intensive as it stores full state copies.19  
2. **The Command Pattern:** Each user action or algorithmic step is encapsulated as a Command object containing both execute() and undo() methods.19 This pattern is significantly more memory-efficient because it only stores the transition logic and the data necessary to reverse it.19

| Feature | Memento Pattern | Command Pattern |
| :---- | :---- | :---- |
| **Memory Efficiency** | Low (Stores full states) | High (Stores deltas/inverse logic) |
| **Implementation** | Straightforward | Complex (Requires inverse logic) |
| **State Consistency** | Guaranteed by replacement | Dependent on logic symmetry |
| **Use Case** | Complex/Large states | Fine-grained, frequent actions |

19

For complex graphics tools, a hybrid approach—storing a "Memento of Commands"—is often the most effective solution, allowing the system to replay a sequence of commands from the last full checkpoint to achieve a specific temporal state without the overhead of storing every intermediate frame.19

### **Durable Execution for Distributed Simulators**

In more complex scenarios involving distributed cryptographic protocols, developers can utilize durable execution models provided by platforms like Temporal.22 Temporal abstracts the "plumbing" of state transitions, automatically persisting variables and progress to a database.22 This enables "event sourcing," where the complete state of a workflow can be replayed from its history, providing a high degree of reliability and ensuring that simulations can resume even after system crashes or network delays.22

## **Performance Optimization for Complex Graphic States**

Rendering high-density cryptographic telemetry—such as the state of every bit in a multi-round encryption process—requires optimization strategies that leverage the GPU's parallel processing power and minimize the overhead of data transfers.

### **GPU-Accelerated Particle Systems and Transformations**

When visualizing the movement of data, particle systems entirely run on the GPU offer unprecedented scale. Benchmarks show that WebGPU significantly outperforms WebGL in compute-heavy tasks, with position updates being processed up to 100 times faster.8

| GPU Type | API | Max Particles at 60 FPS |
| :---- | :---- | :---- |
| **High-end NVIDIA** | WebGPU | 37,000,000 |
| **High-end NVIDIA** | WebGL | 2,700,000 |
| **Lower-end Intel** | WebGPU | 2,100,000 |
| **Lower-end Intel** | WebGL | 374,000 |

8

To optimize these systems in a WebGL environment, developers must focus on reducing "marshaling overhead"—the cost of transferring geometry from JavaScript to the GPU.2 Strategies include using Vertex Buffer Objects (VBOs) to store transformation matrices and issuing single draw calls for thousands of identical primitives.2 This ensures that the GPU handles the heavy lifting of visual rendering while the CPU is freed for business logic and cryptographic calculations.2

### **Advanced Text Rendering via Signed Distance Fields (SDF)**

Cryptographic visualizations are inherently text-heavy, requiring the display of hex codes, bit strings, and mathematical notations. However, GPUs treat text as geometry, which makes traditional font rendering difficult.3

1. **Texture Atlases:** The most common method involves rasterizing glyphs into a texture atlas on demand.24 While simple, this approach results in "blocky" text when zoomed in beyond the atlas resolution.24  
2. **Signed Distance Fields (SDF):** This technique, popularized by Valve, stores the distance to the edge of a character rather than the pixels themselves.25 A single texture can scale from 6px to 200px+ without loss of quality, as the GPU interpolates the distance to create a sharp edge at any resolution.25  
3. **Multi-Channel SDF (MSDF):** While standard SDFs struggle with sharp corners, MSDF uses three color channels to store distance data, allowing for high-quality reconstruction of sharp joins even in complex serif fonts.25

Mathematically, the reconstruction of an edge from an SDF texture ![][image1] at position ![][image2] can be represented using a thresholding function:

![][image3]  
where ![][image4] represents the edge width used for anti-aliasing.25

## **Cryptographic Logic and Adapter Integration**

A modular rendering pipeline must be capable of integrating various cryptographic backends seamlessly. This is achieved through the use of the Adapter Pattern, which bridges the gap between the pipeline's expected interface and the specific APIs of different libraries.27

### **Engine Abstraction and Libsodium Integration**

Libraries like libsodium and TweetNaCl offer different modularity profiles. libsodium is a robust, packageable library with an extensive API supporting modern algorithms like ChaCha20-Poly1305 and Ed25519.14 In contrast, TweetNaCl is an extremely concise reimplementation (fitting into 100 tweets) that focuses on auditability and trivial integration via inclusion rather than reference.15

A modular pipeline should utilize an adapter to provide a unified interface:

TypeScript

interface CryptoAdapter {  
  encrypt(plainText: Uint8Array, key: Uint8Array): Promise\<Uint8Array\>;  
  decrypt(cipherText: Uint8Array, key: Uint8Array): Promise\<Uint8Array\>;  
}

Adapters for CryptoJS, libsodium-wrappers, or the native Web Crypto API can then be swapped dynamically based on the environment (e.g., using CryptoJS in legacy browsers or Web Crypto in modern ones).29 This ensures the pipeline remains environment-agnostic while maintaining a consistent cryptographic behavior across all platforms.29

### **Substitution and Transposition Logic**

The fundamental logic for many visualizations involves substitution and transposition. In a standard substitution cipher with shift ![][image5] over an alphabet of size ![][image6], the transformation is governed by modular arithmetic 30:

![][image7]  
In JavaScript, care must be taken with the modulus of negative numbers during decryption:

![][image8]  
Implementation requires mapping the alphabet to an index, performing the operation, and mapping back.30 For more complex polyalphabetic substitutions like the Vigenère cipher, the shift ![][image5] becomes a function of a keyword, ![][image9], where ![][image10] is the key length.32 A modular pipeline handles these by treating the "Logic" layer as a separate filter that merely updates the state vector, which the rendering layer then visualizes as shifts or character replacements.9

## **Accessibility and Usability Considerations**

Interactive cryptography tools must be designed with accessibility as a core requirement, ensuring that the visual flow of data is also perceivable by users with visual impairments or those relying on assistive technologies.

### **ARIA Live Regions and Semantic Overlays**

Since Canvas and WebGL contexts are inherently opaque to screen readers, developers must utilize ARIA (Accessible Rich Internet Applications) to expose dynamic updates.33

* **aria-live="polite":** This attribute is used for non-critical status updates, such as "Round 1 Complete" or "Key Generated," ensuring that the screen reader waits for a pause in speech before announcing the update.34  
* **aria-live="assertive":** Reserved for time-critical alerts, such as "Invalid Key" or "Authentication Failure," which must interrupt the current speech.34  
* **aria-atomic="true":** Ensures the screen reader announces the entire region when only a part changes, which is useful for displaying the full updated state of a 128-bit block after a substitution round.34

### **Focus Management and Keyboard Accessibility**

Interactive elements within a visualization—such as buttons for "Next Step" or individual bit-toggle inputs—must be accessible via keyboard navigation.36 Developers should provide descriptive titles and labels for all axes and data points, using ARIA roles (e.g., role="progressbar") to provide semantic meaning to custom-drawn graphics.33 Furthermore, offering the underlying data in a tabular format (an "Accessibility Data Table") provides a fallback for users who cannot perceive the graphical visualization but need to understand the cryptographic state changes.36

## **Quality Assurance: Visual Regression and Reproducibility**

Maintaining the visual and logical integrity of a rendering pipeline requires automated testing strategies that can detect "perceptual regressions" in complex shaders or state transitions.

### **Playwright and Cypress for Graphics Testing**

Visual regression testing focuses on image and pixel comparisons, verifying that the UI remains visually consistent after code changes.38 Tools like Playwright and Cypress capture screenshots of specific elements (e.g., the WebGL canvas) and compare them against a stored baseline.39

Key strategies for deterministic graphics testing include:

* **Threshold Management:** Using a maxDiffPixels or maxDiffPixelRatio to ignore minor rendering noise caused by different GPU drivers or antialiasing algorithms.40  
* **Environment Normalization:** Enforcing consistent browser launch flags (e.g., \--disable-gpu, \--force-device-scale-factor=1) to prevent flakiness due to varying hardware DPIs or resource scaling.42  
* **State Mocking:** Intercepting network requests or mocking timestamps to ensure that dynamic content does not trigger false positives in visual diffs.42

| Assertion Method | Scope | Best Use Case |
| :---- | :---- | :---- |
| **toHaveScreenshot()** | Visual Artifact | Verifying shader output/layout |
| **toMatchSnapshot()** | Buffer / JSON | Verifying API response or state state |
| **locator.screenshot()** | Component | Testing isolated UI elements |

40

### **Documentation through JSDoc and Namespaces**

For complex graphics pipelines, documentation must go beyond basic comments to provide a structured API reference. Utilizing JSDoc with namespaces (e.g., @namespace Rendering, @namespace CryptoLogic) allows developers to maintain a logical hierarchy in the generated documentation.45 Using @typedef for complex objects—like a 3D transformation matrix or a cipher state block—enables reusability and ensures that the entire team understands the data shapes flowing through the pipes and filters.45

## **Conclusion and Future Outlook**

The development of a modular cipher rendering pipeline is a multifaceted architectural challenge that demands a rigorous separation of concerns. By selecting high-performance graphics frameworks like WebGL or WebGPU based on specific data volume crossovers, and decoupling logic from rendering through the Pipes and Filters and Command patterns, developers can build tools that are both interactive and scalable. The integration of accessibility-first design via ARIA live regions and robust quality assurance through visual regression testing ensures that these educational and professional tools remain reliable across varied environments. As browser technologies continue to advance toward explicit GPU control through WebGPU, the capacity for real-time, high-fidelity visualization of complex cryptographic protocols will only increase, providing unprecedented insight into the mathematical foundations of digital security.

#### **Works cited**

1. WebGL vs. Canvas: Which is Better for 3D Web Development? \- PixelFreeStudio Blog, accessed December 28, 2025, [https://blog.pixelfreestudio.com/webgl-vs-canvas-which-is-better-for-3d-web-development/](https://blog.pixelfreestudio.com/webgl-vs-canvas-which-is-better-for-3d-web-development/)  
2. Comparing Canvas vs. WebGL for JavaScript Chart Performance \- DigitalAdBlog, accessed December 28, 2025, [https://digitaladblog.com/2025/05/21/comparing-canvas-vs-webgl-for-javascript-chart-performance/](https://digitaladblog.com/2025/05/21/comparing-canvas-vs-webgl-for-javascript-chart-performance/)  
3. WebGL vs Canvas: Best Choice for Browser-Based CAD Tools | by AlterSquare \- Medium, accessed December 28, 2025, [https://altersquare.medium.com/webgl-vs-canvas-best-choice-for-browser-based-cad-tools-231097daf063](https://altersquare.medium.com/webgl-vs-canvas-best-choice-for-browser-based-cad-tools-231097daf063)  
4. WebGL vs Canvas: Best Choice for Browser-Based CAD Tools \- AlterSquare, accessed December 28, 2025, [https://www.altersquare.io/webgl-vs-canvas-best-choice-for-browser-based-cad-tools/](https://www.altersquare.io/webgl-vs-canvas-best-choice-for-browser-based-cad-tools/)  
5. WebGL vs. Three.js: Key Differences for 3D Graphics \- PixelFreeStudio Blog, accessed December 28, 2025, [https://blog.pixelfreestudio.com/webgl-vs-three-js-key-differences-for-3d-graphics/](https://blog.pixelfreestudio.com/webgl-vs-three-js-key-differences-for-3d-graphics/)  
6. Which has better performance between Canvas and WebGL? \- Cocos Forums, accessed December 28, 2025, [https://forum.cocosengine.org/t/which-has-better-performance-between-canvas-and-webgl/40802](https://forum.cocosengine.org/t/which-has-better-performance-between-canvas-and-webgl/40802)  
7. 20+ JavaScript libraries to draw your own diagrams (2024 edition) \- Modeling Languages, accessed December 28, 2025, [https://modeling-languages.com/javascript-drawing-libraries-diagrams/](https://modeling-languages.com/javascript-drawing-libraries-diagrams/)  
8. Performance Comparison of WebGPU and WebGL for 2D Particle Systems on the Web \- DiVA portal, accessed December 28, 2025, [https://www.diva-portal.org/smash/get/diva2:1945245/FULLTEXT02](https://www.diva-portal.org/smash/get/diva2:1945245/FULLTEXT02)  
9. Enhancing Software Design with the Pipes and Filters Pattern: Modular, Scalable, and Flexible Solutions \- Curate Partners, accessed December 28, 2025, [https://curatepartners.com/tech-skills-tools-platforms/enhancing-software-design-with-the-pipes-and-filters-pattern-modular-scalable-and-flexible-solutions/](https://curatepartners.com/tech-skills-tools-platforms/enhancing-software-design-with-the-pipes-and-filters-pattern-modular-scalable-and-flexible-solutions/)  
10. CipherFlow, accessed December 28, 2025, [https://powergr.github.io/cipherflow-visualizer/](https://powergr.github.io/cipherflow-visualizer/)  
11. (PDF) Design of Modular Rendering Pipeline \- ResearchGate, accessed December 28, 2025, [https://www.researchgate.net/publication/4292643\_Design\_of\_Modular\_Rendering\_Pipeline](https://www.researchgate.net/publication/4292643_Design_of_Modular_Rendering_Pipeline)  
12. Architectural patterns for modular monoliths that enable fast flow \- Microservices.io, accessed December 28, 2025, [https://microservices.io/post/architecture/2024/09/09/modular-monolith-patterns-for-fast-flow.html](https://microservices.io/post/architecture/2024/09/09/modular-monolith-patterns-for-fast-flow.html)  
13. An Interactive Visualization Tool for Animating Behavior of Cryptographic Protocols, accessed December 28, 2025, [https://www.researchgate.net/publication/275224247\_An\_Interactive\_Visualization\_Tool\_for\_Animating\_Behavior\_of\_Cryptographic\_Protocols](https://www.researchgate.net/publication/275224247_An_Interactive_Visualization_Tool_for_Animating_Behavior_of_Cryptographic_Protocols)  
14. NaCl (software) \- Wikipedia, accessed December 28, 2025, [https://en.wikipedia.org/wiki/NaCl\_(software)](https://en.wikipedia.org/wiki/NaCl_\(software\))  
15. TweetNaCl: A crypto library in 100 tweets \- Peter Schwabe, accessed December 28, 2025, [https://cryptojedi.org/papers/tweetnacl-20140917.pdf](https://cryptojedi.org/papers/tweetnacl-20140917.pdf)  
16. State Machine Simplified | Whitepaper \- Temporal, accessed December 28, 2025, [https://pages.temporal.io/download-state-machines-simplified.html](https://pages.temporal.io/download-state-machines-simplified.html)  
17. Implementing a simple state machine library in JavaScript \- Kent C. Dodds, accessed December 28, 2025, [https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript](https://kentcdodds.com/blog/implementing-a-simple-state-machine-library-in-javascript)  
18. How to implement a pause state and exit from the paused state in a state machine? · dotnet-state-machine stateless · Discussion \#537 \- GitHub, accessed December 28, 2025, [https://github.com/dotnet-state-machine/stateless/discussions/537](https://github.com/dotnet-state-machine/stateless/discussions/537)  
19. javascript \- How to make a undo/redo function \- Stack Overflow, accessed December 28, 2025, [https://stackoverflow.com/questions/54416318/how-to-make-a-undo-redo-function](https://stackoverflow.com/questions/54416318/how-to-make-a-undo-redo-function)  
20. Undo/redo history pattern example in JavaScript \- GitHub Gist, accessed December 28, 2025, [https://gist.github.com/1j01/bd2329547904b97abc52fd5e76b008d8](https://gist.github.com/1j01/bd2329547904b97abc52fd5e76b008d8)  
21. Implementing Undo and Redo functionality javascript and php \- Stack Overflow, accessed December 28, 2025, [https://stackoverflow.com/questions/8837387/implementing-undo-and-redo-functionality-javascript-and-php](https://stackoverflow.com/questions/8837387/implementing-undo-and-redo-functionality-javascript-and-php)  
22. Temporal: Beyond State Machines for Reliable Distributed Applications, accessed December 28, 2025, [https://temporal.io/blog/temporal-replaces-state-machines-for-distributed-applications](https://temporal.io/blog/temporal-replaces-state-machines-for-distributed-applications)  
23. Implement Finite State Machine Transitioning in the workflow \- Temporal Community Forum, accessed December 28, 2025, [https://community.temporal.io/t/implement-finite-state-machine-transitioning-in-the-workflow/8143](https://community.temporal.io/t/implement-finite-state-machine-transitioning-in-the-workflow/8143)  
24. Best approach to render a lot of text. : r/GraphicsProgramming \- Reddit, accessed December 28, 2025, [https://www.reddit.com/r/GraphicsProgramming/comments/123o0ly/best\_approach\_to\_render\_a\_lot\_of\_text/](https://www.reddit.com/r/GraphicsProgramming/comments/123o0ly/best_approach_to_render_a_lot_of_text/)  
25. Better Quality Text in WebGL \- Stack Overflow, accessed December 28, 2025, [https://stackoverflow.com/questions/25956272/better-quality-text-in-webgl](https://stackoverflow.com/questions/25956272/better-quality-text-in-webgl)  
26. Signed Distance Field Fonts \- basics \- Red Blob Games, accessed December 28, 2025, [https://www.redblobgames.com/x/2403-distance-field-fonts/](https://www.redblobgames.com/x/2403-distance-field-fonts/)  
27. Adapter Pattern Implementation in JavaScript | by Artem Khrienov \- Medium, accessed December 28, 2025, [https://medium.com/@artemkhrenov/adapter-pattern-implementation-in-javascript-d6f9f396090b](https://medium.com/@artemkhrenov/adapter-pattern-implementation-in-javascript-d6f9f396090b)  
28. Libsodium documentation: Introduction, accessed December 28, 2025, [https://libsodium.gitbook.io/doc](https://libsodium.gitbook.io/doc)  
29. @one-payments/adapters-crypto-js \- NPM, accessed December 28, 2025, [https://www.npmjs.com/package/@one-payments/adapters-crypto-js](https://www.npmjs.com/package/@one-payments/adapters-crypto-js)  
30. Substitution Cipher \- GeeksforGeeks, accessed December 28, 2025, [https://www.geeksforgeeks.org/python/substitution-cipher/](https://www.geeksforgeeks.org/python/substitution-cipher/)  
31. Substitution Cipher in JavaScript | by Tim Severien \- Medium, accessed December 28, 2025, [https://medium.com/@TimSeverien/substitution-cipher-in-javascript-d530eb2d923d](https://medium.com/@TimSeverien/substitution-cipher-in-javascript-d530eb2d923d)  
32. Ciphers · TheAlgorithms/JavaScript Wiki \- GitHub, accessed December 28, 2025, [https://github.com/TheAlgorithms/Javascript/wiki/Ciphers](https://github.com/TheAlgorithms/Javascript/wiki/Ciphers)  
33. ARIA \- Accessibility \- MDN Web Docs \- Mozilla, accessed December 28, 2025, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)  
34. ARIA live regions \- MDN Web Docs \- Mozilla, accessed December 28, 2025, [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live\_regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)  
35. ARIA live regions \- Module 11 \- ESDC / IT Accessibility office, accessed December 28, 2025, [https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module11/aria-live.html](https://bati-itao.github.io/learning/esdc-self-paced-web-accessibility-course/module11/aria-live.html)  
36. Data Visualizations \- Technology Accessibility \- The University of Alabama, accessed December 28, 2025, [https://accessibility.ua.edu/accessibilityresources/accessible-data-visualizations/](https://accessibility.ua.edu/accessibilityresources/accessible-data-visualizations/)  
37. Accessible Design Patterns \- TLOS | Virginia Tech, accessed December 28, 2025, [https://tlos.vt.edu/digital-accessibility/web-accessibility/accessible-design-patterns.html](https://tlos.vt.edu/digital-accessibility/web-accessibility/accessible-design-patterns.html)  
38. How to perform Visual Regression Testing using Cypress | BrowserStack, accessed December 28, 2025, [https://www.browserstack.com/guide/visual-regression-testing-with-cypress](https://www.browserstack.com/guide/visual-regression-testing-with-cypress)  
39. A Complete Guide To Playwright Visual Regression Testing \- LambdaTest, accessed December 28, 2025, [https://www.lambdatest.com/learning-hub/playwright-visual-regression-testing](https://www.lambdatest.com/learning-hub/playwright-visual-regression-testing)  
40. Playwright Visual Testing: A Comprehensive Guide to UI Regression \- Codoid, accessed December 28, 2025, [https://codoid.com/automation-testing/playwright-visual-testing-a-comprehensive-guide-to-ui-regression/](https://codoid.com/automation-testing/playwright-visual-testing-a-comprehensive-guide-to-ui-regression/)  
41. Visual comparisons | Playwright, accessed December 28, 2025, [https://playwright.dev/docs/test-snapshots](https://playwright.dev/docs/test-snapshots)  
42. The UI Visual Regression Testing Best Practices Playbook | by Shubham Sharma | Medium, accessed December 28, 2025, [https://medium.com/@ss-tech/the-ui-visual-regression-testing-best-practices-playbook-dc27db61ebe0](https://medium.com/@ss-tech/the-ui-visual-regression-testing-best-practices-playbook-dc27db61ebe0)  
43. Visual Testing in Cypress, accessed December 28, 2025, [https://docs.cypress.io/app/tooling/visual-testing](https://docs.cypress.io/app/tooling/visual-testing)  
44. Playwright Visual Regression Testing: A Complete Guide | TestGrid, accessed December 28, 2025, [https://testgrid.io/blog/playwright-visual-regression-testing/](https://testgrid.io/blog/playwright-visual-regression-testing/)  
45. Creating better JSDoc documentation | The Startup \- Medium, accessed December 28, 2025, [https://medium.com/swlh/creating-better-jsdoc-documentation-8b7a65744dcb](https://medium.com/swlh/creating-better-jsdoc-documentation-8b7a65744dcb)  
46. Code Documentation Best Practices \- OneNine, accessed December 28, 2025, [https://onenine.com/code-documentation-best-practices/](https://onenine.com/code-documentation-best-practices/)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAAsUlEQVR4XmNgGAWEQBcQfwTi/1D8HYjfoYldh6smAGAasIGfDLjlUABI0SF0QSjgYYDIN6CJo4AIBogiR3QJJIDPpWBwjYGAAgYiDCGogIEINSDJA+iCSMCNAaIGZyzBwsMBTRwZ3GaAqBFDl4ABQs40ZIDI16FLIAOQAlA6wAVA8k/QBZGBCgNEUTO6BBDIMUDk1qFLwEAgEJ9kQHjlDhAfh+KzUDFQ0jeFaRgFIw4AAFhqNpdzGLpuAAAAAElFTkSuQmCC>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAYCAYAAABurXSEAAAB+UlEQVR4Xu2Wv0sdQRSFb4IEEzBBEZRAwEosJCA2IggKImIVIUUkoIgIBktBUtnZ+AdoIQpWgo2VijYmVSoLK8WAYBEtBEEwmB8SvQdnyH1nd/a9XeVt8z44uPPdmTe76+zsilTIlz4WZSb1/BOazyzLzDPNJcsQbzSnLHNiULPHMo5bTTXLHMH5NLC0dGp+s8yZMc01S8tfyX8tx4G7HQTF5ywdnzTzLJUXmicsi1CvWdK8NK5Rs2DaFpzXAEtQI+Er+qrp0uxKdPlgzHtySfRrluV+S7Pz4Tg0/x/NNkvQI/GDnmrW3DHqdn21O5cG33/FHIPX1LYcak5YglGJH9SkqXLHqA/9L8mGc2nodn8xbt947+LYkkBtRAIFx4xE62j/IFcKr+R+bAv5b9T2BG9OhwQKjn8uFvSfJFcKixKdCy8SPKBxHGguWIJaif6QBbVV025zDmu+VfPB1PBfSeJYonNx2/JLs8PSg4F458dxI4VXi7vuJzoyft35TeOYOSk8yVnNW9Nm0PcdSw+KUywdeBix3aHPmXP4RkF72HdS6jTnzieBO4c+SC/VmMTfmtZcscxIyV9oRcCy8zcpCK7Kb3FZadZ8ZJkRnA/elongjfWdZUp4l8kKXnhfWIbAgzLOMgVpv0XiwK70k2UxRliUmcdaXhUexB3rFm26uuAWdgAAAABJRU5ErkJggg==>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAZCAYAAAABmx/yAAAApklEQVR4XmNgGAWjAAhmAPF9IP4PxIxI4gVA/AeJD5LfCePoAnE5kkQ6TALKf4XGB2Ew+AGljaGCLDAJKD8PiR8BxGdgnFoo3c2AZBoQMEH5IBfBgAYQT0XigwFI0UskPsgmZINAoAGIxdDEwIrCkPgvoGLI4C8an4GbAVMRiP8MTQweosgApLACyhaH8pENu4/ERgGwUAXhh1CxO0hiwlCxUTD4AADh0Sp0gvlmIgAAAABJRU5ErkJggg==>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAXCAYAAAA/ZK6/AAAAlUlEQVR4XmNgGAWDCegC8Twg5obyeYG4AYgnADETVAwO2IF4KxBHA/F/IG4G4gVQuXqoGArYC6VhGhqR5EA2YWgohdLXGDAls7GIwQFIoh2L2GU0MTCQYIBIgpwAA3xQMQUofypCCsJBtxpZrBqIlZDkGP4C8VdkASAoYIBo0AfiS2hyDBZAzIouyACJHwN0wVFACAAA3qgdBAlcrcAAAAAASUVORK5CYII=>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAYCAYAAAAh8HdUAAAAjklEQVR4XmNgGP5gHhB/AuL/SPgjEPchK8IFYBqIBowMEA1n0SXwgWwGiCYvdAl84CUDiU4DAZL9AwIgDSfQBfEBQv5xQhcAgdcM+J0GijMMgM8/NUDsiC7IzADRcBFdAghkGXAY1s8AkQhEE58BFb+ALLgYiH8B8V8g/gdVAMMg/h8g/g7EMjANo4DuAAC9SCmctvS58wAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,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>

[image8]: <data:image/png;base64,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>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAAYCAYAAAA8jknPAAADiElEQVR4Xu2ZW6hNQRjHP/fcIveEzgsvKOVFeHdJIeHBrZDCi5OQEkee3BWSwtm51kFSrg9KKUlCCaU4LpH7Xbnz/c3M2d/69qy19zl7n3P20vzq3575z7rMmm/WzKzZRIFAIBAIBALlxTzWO9YfodeRI4geiTJobbQ4kGZcUH2MYT1ntdIFgfQTF/ijrNXaDPwfDCYT9F3K/8iqUF7Aw1DWPlZHm+/MqmJtY7W0XjlSQybwvWy+B+tbtjiQRDvWadYMMo24jpWxZWusV67IYX6+TX/JFgeSuGB/XeDlyhdvfjGBr2IdiNF+Mh2smrWXtYdViZPqAer2i3WNNdnmoRbyoBKAkXCuNsuYO9rwscz+4mAd5MUeD2BIfazNJsbN75Cbotxbf8IdFMMi1lJtJlCrjRKCDovpaYMuKJIP2ogDDXZZeTjZF3jMqcO12cQcJ1O3Tsp3nSGJaaz22owBC0fXsRqLLVT6wC9nDdOmDzTWWI+3Unn1YQGZBypUS8xpBREX4DNk/Dm6oIH47lFqNlHpAw+wwZXIdMp9wKnC68baYdP3Wb9tujlB3X5qk8xXSFynAE9Zn7WZQK1I9yFz3Vess2RGHSwmu7Mukdk5nFJ3tDkeU+IK1kvhA6xzLrJuso5R/sCfY91ijSdzvIvBdTL1wP01cW1QBy6oDzolPOx+gYlkdsG+k+kMzQXqgbrt1AUWF3g9HaGRgH7WOLqwTipvAEXPR+dD8ByyTKYxtby3aQztR0TZQUoO/CH7i+v1tGl8fmO/wuF7Jp8XAZXfrrw2lG3Arqos7wUbiYWsT2SGsLdk3lys6iVYlzxjPSHT0D+ixTSOdVd5cUyg3HbpS9Hnxxs/SuRd2UyRdrg8fkcIP0PJgQeDKPqpigVhhcjrewGf12DWs3ZrM0V8ZfXTZgxDKPcLoTdFGxRvnQyiK5sl0g4Z+NHCz7A2iryPw6xVIi+vvZn8MdH3Lwp3sQcRNz24+heyj9+adU95/SnaoBh1Roq8LJPpgZT99xDrJdmhrrC2irwPXAujMMC0oe+Dur4QnvNLRg3rBqutLkgJWJg91GYCsvEwzGOaeUNmqMVUgjQ8DPeYZhBcNyR3sHlMLfqNxoYV1gZY9GGOx33w5saBdZVjNpnPNUc1mQ7qOoaj4G/5QC7nyWxrpw1svmGUCRTBbW2kgLzf8IH8YEE3SZtlzFVtBAL/+AsCiu0+i7uTVgAAAABJRU5ErkJggg==>

[image10]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAYCAYAAAAcYhYyAAAAzklEQVR4Xu2QsQqBYRSGj2SSG8BoYnEBymIwKZtRLkGySJJLMCmDW5FyAyarndWieN/vPz+n4xvM+p968nvO1+f8RDIyfqcJN7Co30twDscwlx4CU7iDFdMCBXiAPfiEK0kOkoW2OjzDPCxrq+qZwF4/h5IMl59R2IjtYhphm9jAtQl/iUPLKNK4DVvD9QAHR9e4gb+Em/r2hoNupKWva9vVtcBA4reztSOto893OzjJ9yWx/6Nl2gzWzEwecG0D2MKba4Svwov6fpDxt7wA+DAuJEA6mfoAAAAASUVORK5CYII=>