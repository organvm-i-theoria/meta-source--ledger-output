# Interrogating identity: A cross-disciplinary research synthesis for critical identity-kit practice

The identity-kit project sits at a productive intersection where surveillance studies, performativity theory, and artistic practice converge to challenge fixed notions of selfhood. This research synthesis identifies **Simone Browne's "racializing surveillance," Judith Butler's performativity, and critical making methodologies** as the most generative theoretical foundations, while **Heather Dewey-Hagborg, Adam Harvey, and Trevor Paglen** provide the strongest artistic precedents—notably with open-source, reproducible approaches. The field reveals a fundamental tension: algorithmic systems require stable, categorical identities to function, while critical theory demonstrates identity as performed, contested, and contextual. Projects that make this tension visible through participatory, code-based interventions represent the most promising direction for new work.

---

## From Bertillon to biometrics: The genealogy of measurable identity

Identity systems have always embedded assumptions about the measurability and fixity of selfhood. **Alphonse Bertillon's anthropometry** (1879) established the template: nine skeletal measurements, standardized photographs, and coded cards created the fiction that identity could be decomposed into discrete, permanent features. This assumption persists in contemporary facial recognition systems, which encode faces as mathematical vectors—a direct descendant of Bertillonage's taxonomic thinking.

Colonial identification systems reveal how classification constructs the categories it claims merely to describe. South Africa's **pass laws (1709–1986)** required all Black South Africans to carry passbooks containing fingerprints, photographs, and employment records, producing over 17 million arrests and enabling apartheid's labor control regime. British India's census classified populations by religion, caste, and race, creating administrative categories that became social realities. Spain's *casta* system in colonial America generated elaborate taxonomies of racial mixture—Mestizo, Mulatto, Morisco—visualized in casta paintings that depicted supposed racial hierarchy.

The critical scholarship that excavates these histories provides essential context for contemporary work. **Simone Browne's** *Dark Matters: On the Surveillance of Blackness* (2015) traces continuities from slavery-era technologies—branding, lantern laws, runaway slave notices—to TSA profiling, establishing "racializing surveillance" as a framework for understanding how surveillance produces racial categories. **Kelly Gates's** *Our Biometric Future* (2011) traces facial recognition technology from 1960s DoD funding to commercial deployment, demonstrating how FRT exemplifies failed technocratic governance pursuing technology as solution to complex social problems. **Shoshana Magnet's** *When Biometrics Fail* (2011) introduces "corporeal fetishism"—the false assumption that bodies can be accurately rendered in biometric code—showing how systems fail disproportionately on women, people of color, and people with disabilities.

---

## Algorithmic identity and the politics of classification

Contemporary identity systems don't simply recognize pre-existing selves; they actively construct identities through classification. **John Cheney-Lippold's** *We Are Data* (2017) argues that algorithms constantly assign and reassign gender, race, sexuality, and citizenship status through "measurable types"—classifications that serve corporate and state interests rather than individual self-understanding. His concept of "soft biopolitics" describes how data categorization controls access to resources and life chances without direct domination.

**Joy Buolamwini and Timnit Gebru's** Gender Shades study (2018) provided the landmark empirical demonstration of algorithmic bias, finding that commercial facial analysis systems misclassified darker-skinned women at rates up to **34.7%** while lighter-skinned men achieved error rates as low as **0.8%**. This intersectional analysis—showing that race and gender compound in their effects—directly prompted IBM and Microsoft to improve their systems and catalyzed policy debates about facial recognition regulation.

**Os Keyes's** "The Misgendering Machines" (2018) analyzed 58 facial recognition papers across 30 years, finding that **94.8%** treated gender as binary and **72.4%** as immutable. Automated Gender Recognition, Keyes argues, fundamentally erases transgender identities—and the solution isn't inclusion in datasets but abolition of such systems entirely. This represents a crucial insight for identity-kit projects: the problem may not be technical failure but the classificatory logic itself.

The theoretical framework connecting algorithmic systems to identity theory centers on a productive contradiction. **Judith Butler's** performativity thesis holds that gender is "not a noun, but a verb"—a stylized repetition of acts that creates the appearance of stable identity rather than expressing an inner essence. Yet algorithmic systems require precisely the stable, categorical identities that performativity theory reveals as constructions. **Wendy Hui Kyong Chun's** *Discriminating Data* (2021) shows how machine learning encodes segregation through "homophily"—clustering "like" people in ways that reinforce polarization. Her concept of "algorithmic authenticity" captures how authenticity itself becomes algorithmically mediated.

Deepfakes intensify these questions. If identity is constituted through performance, synthetic identity represents a new form of performativity—algorithmic performance that destabilizes distinctions between real and created. A 2024 industry survey found that **49% of companies** experienced both audio and video deepfake fraud, up from 37%/29% in 2022. Authentication systems must now verify "liveness"—proving physical presence—but this only reinforces the essentialist assumptions that performativity theory critiques.

---

## Artistic precedents that make algorithmic systems visible

The most significant artistic interventions in this space interrogate identity systems by making their operations visible and inviting participation in their critique.

**Heather Dewey-Hagborg's** *Stranger Visions* (2012–2013) extracted DNA from discarded materials—hair, cigarettes, chewing gum—found on New York streets, then used custom software to generate 3D-printed portraits of anonymous genetic donors. The project anticipated forensic DNA phenotyping services by two years while demonstrating the subjective interpretation required to translate genetic data into facial features. Her *Probably Chelsea* (2017)—30 different algorithmically-generated portraits from Chelsea Manning's DNA—visualizes the gap between genetic determinism's claims and phenotypic reality. **Critically, her genetic profiling code is open-source** (github.com/hdeweyh/strangerVisions), enabling reproducible practice.

**Trevor Paglen and Kate Crawford's** *ImageNet Roulette* (2019) exposed bias in ImageNet's person classification by letting users upload photos to see how the training data classified them—often with derogatory, racist, or absurd labels. The project went viral and prompted ImageNet to remove **600,000 images** from its person categories. Their exhibition *Training Humans* (Fondazione Prada, 2019) traced the history of training images from the 1960s to present, establishing "machine vernacular"—photographs never intended for human eyes—as a category of visual culture requiring critical attention.

**Adam Harvey's** work provides the most comprehensive toolkit for counter-surveillance practice. *CV Dazzle* (2010–present) developed makeup and hairstyling techniques that defeat face detection algorithms; *HyperFace* (2017) created textile patterns generating false-positive face detections; *MegaPixels* researches the provenance of machine learning training datasets. **Multiple projects are open-source**: DFACE.app for automatic face redaction and VFRAME.io, a computer vision toolkit for human rights research.

**Zach Blas's** *Facial Weaponization Suite* (2011–2014) took a different approach: community workshops produced "collective masks" from aggregated 3D facial scans, creating amorphous forms unrecognizable as human faces by biometric systems. The *Fag Face Mask* (2012) responded to studies claiming to detect "gay faces" by aggregating queer men's biometric data into a pink, blob-like mask embodying what Blas calls "informatic opacity"—drawing on Édouard Glissant's postcolonial theory of the right not to be understood.

**Nancy Burson's** pioneering work established digital face morphing as artistic practice. Her *Human Race Machine* (2000) allows viewers to see themselves as different races, while composite portraits like *Warhead I* (1982)—blending Reagan, Brezhnev, and other leaders—interrogated political power through facial synthesis. Her technology was patented and acquired by the FBI and National Center for Missing and Exploited Children, demonstrating how artistic innovation feeds surveillance infrastructure.

**Lauren Lee McCarthy**, creator of **p5.js** (the open-source creative coding platform with over 10 million users), embeds surveillance critique in her own artistic practice. *LAUREN* (2017) involved the artist operating as a human "smart home" assistant via surveillance cameras; *SOMEONE* (2019), which won the Ars Electronica Golden Nica, crowdsourced human surveillance as a distributed system.

---

## Methodological frameworks for theory-practice-code integration

The identity-kit project requires methodological grounding that legitimates practice-based research while maintaining critical rigor. Several frameworks prove particularly useful.

**Critical making** (Matt Ratto, 2011) bridges abstract critical thinking with embodied material practice. Unlike critical design, which emphasizes finished artifacts, critical making focuses on the process—making as concept elaboration. For identity-kit work, this suggests that the act of constructing identity documents or classification systems is itself the critical intervention, not merely the resulting objects.

**Adversarial design** (Carl DiSalvo, 2012) draws on Chantal Mouffe's agonistic theory to position design as political contestation rather than problem-solving. Designed artifacts generate "ongoing questioning, challenging and reframing as a self-reflective mechanism for democracy." This framework legitimates identity-kit projects that produce productive discomfort rather than resolution.

**Research through Design** (Zimmerman, Forlizzi, Evenson, 2007) establishes designed artifacts as research contributions that embody "what ought to be." The framework requires rigorous documentation of problem framing, solution development, testing, and critical reflection. For publication, artifacts function as "vehicles for embodying" research claims.

**Data Feminism** (D'Ignazio and Klein, 2020) provides seven principles for intersectional engagement with data systems: examine power, challenge power, elevate emotion and embodiment, rethink binaries and hierarchies, embrace pluralism, consider context, and make labor visible. The framework explicitly addresses how classification systems perpetuate oppression and calls for challenging the binaries that structure identity categorization.

Digital humanities projects modeling critical approaches to identity and archives include the **Colored Conventions Project** (coloredconventions.org), which documents seven decades of 19th-century Black political organizing while foregrounding Black women's contributions often invisible in official records, and **Slave Voyages** (slavevoyages.org), which includes an African Names Database recovering individual identities from transatlantic slave trade records. Decolonizing description initiatives across archives demonstrate practical strategies for challenging classification systems—replacing inappropriate terminology, incorporating Indigenous languages, and enabling community participation in metadata development.

---

## Technical toolkit: Open-source frameworks for reproducible identity art

The technical ecosystem supporting identity-kit practice has matured significantly, enabling reproducible, accessible creative work.

**ml5.js** (ml5js.org) provides the most artist-friendly entry point to machine learning. Key capabilities include **FaceMesh** (468 3D facial landmarks), **BodyPose** (full-body estimation), and custom neural network training. Built on TensorFlow.js and developed by NYU ITP/IMA with explicit ethical guidelines, ml5.js represents the most appropriate starting point for face-related creative coding. **p5.js** (p5js.org) provides the foundational creative coding environment, with **face-api.js** offering JavaScript-native face detection.

For more advanced work, **StyleGAN** (github.com/NVlabs/stylegan) enables photorealistic face generation with controllable attributes for pose, shape, and fine details. The CC BY-NC 4.0 license permits non-commercial artistic use. **OpenCV** and **dlib** provide industry-standard computer vision capabilities including Haar cascade classifiers and 68-point facial landmark detection.

Ethical dataset considerations are paramount. The **FFHQ dataset** (70,000 faces used to train StyleGAN) contains biometric data linked to real names scraped from Flickr Creative Commons images without informed consent—raising GDPR concerns. **FairFace** (github.com/joojs/fairface) was purpose-built for demographic balance across seven race categories. The **Datasheets for Datasets** framework (Gebru et al., 2018) provides standardized documentation covering motivation, composition, collection process, and ethical considerations; **Model Cards** (Mitchell et al., 2019) extend similar documentation to trained models.

Open-source artistic projects providing reproducible models include:

- **Stranger Visions** (Dewey-Hagborg): Genetic profiling code on GitHub
- **DFACE.app / VFRAME.io** (Harvey): Face redaction and computer vision tools
- **p5.js** (McCarthy): Full creative coding platform
- **OpenFace** (CMU): Face recognition with Apache 2.0 license
- **Fawkes** (U. Chicago): Privacy-preserving image "cloaking"

---

## Publication and exhibition structures for hybrid practice

Interdisciplinary identity-kit work finds appropriate venues across art, design, and technology contexts.

**Academic journals** suited to theory-practice-code work include **Leonardo** (MIT Press), the premier art-science-technology journal accepting articles by artists about their own practice; **Digital Creativity** (Taylor & Francis) for design-technology intersection; and **Journal of Artistic Research** for multimedia practice-based publication.

**Conferences** offering strong venues include **SIGGRAPH Art Papers** (accepting 3,500-word long papers or 2,500-word short papers with double-blind review); **DIS** (Designing Interactive Systems), particularly the Critical Computing and Research Through Design tracks; **ISEA** (International Symposium on Electronic Art), which has published proceedings since 1988; and **CHI** for human-computer interaction dimensions.

**Festivals** including **Ars Electronica** (Linz), **transmediale** (Berlin), and venues like ZKM Karlsruhe, Fotomuseum Winterthur, and the Barbican Centre provide exhibition contexts for work combining conceptual rigor with technical implementation.

The most effective documentation model combines:

- **Paper component**: Critical contextualization submitted to Leonardo, SIGGRAPH Art Papers, or ISEA
- **Artifact component**: Physical/digital exhibition piece with video documentation
- **Code component**: GitHub repository including source code, dataset documentation (following Datasheets framework), installation instructions, and example outputs

---

## Gaps and opportunities for new intervention

Several underexplored territories present opportunities for identity-kit practice.

**Real-time participatory face generation** remains rare; most GAN-based face projects present pre-generated outputs rather than enabling user interaction with synthesis processes. **Intersectional identity visualization**—combining race, gender, age, disability, and class in generative systems—lacks sustained artistic exploration despite theoretical frameworks (Crenshaw, Collins) that demand such integration. **Temporal identity**—how past selves relate to present algorithmic classification, and how prediction systems enforce normative life trajectories—offers rich territory for projects drawing on Halberstam's queer temporality.

**Non-Western biometric critique** remains underdeveloped; most critical work centers Western surveillance contexts despite colonial identification systems providing essential historical precedent. **Community-owned alternative datasets** that refuse extractive logics represent a methodological opportunity, as does **repair-oriented practice** that moves beyond critique toward constructive alternatives.

The most generative theoretical synthesis connects **Butler's performativity** (identity as repeated acts without essential foundation) with **Cheney-Lippold's measurable types** (algorithmic categories that construct identities for system purposes) to reveal structural violence: systems requiring categorical stability encounter bodies and selves that exceed and resist classification. Projects making this contradiction experiential—participatory, interactive, code-based—represent the field's cutting edge.

---

## Conclusion: Toward critical identity-kit practice

This research synthesis reveals that the most powerful identity-kit interventions operate across three registers simultaneously: they **theoretically interrogate** the assumptions embedded in identity systems (fixity, measurability, essentialism); they **technically demonstrate** how those systems function and fail; and they **participatorily invite** audiences into experiences of classification, surveillance, and resistance. The scholars who provide the strongest theoretical grounding—Browne, Benjamin, Butler, Cheney-Lippold—all emphasize that identity systems are never neutral but always serve particular interests and produce particular exclusions.

The artists who model effective practice—Dewey-Hagborg, Harvey, Paglen, Blas, McCarthy—combine conceptual rigor with technical implementation while, crucially, making their methods reproducible through open-source code, published documentation, and participatory workshops. The field's most significant gap lies in **accessible tools enabling non-experts to interrogate identity classification**; the most significant opportunity lies in **bridging performativity theory's insights about fluid, contextual identity with the fixed categories algorithmic systems require**. An identity-kit that makes this tension experiential—allowing users to encounter the gap between self-understanding and algorithmic classification—would advance both artistic practice and critical scholarship.

---

## Quick reference: Key resources organized by category

### Essential scholars by domain

**Historical/surveillance studies**: Simone Browne, Kelly Gates, Shoshana Magnet, Btihaj Ajana
**Algorithmic identity**: John Cheney-Lippold, Safiya Noble, Wendy Chun, Ruha Benjamin, Virginia Eubanks
**Bias/fairness**: Joy Buolamwini, Timnit Gebru, Os Keyes
**Philosophical identity**: Judith Butler, Stuart Hall, Kimberlé Crenshaw, Jack Halberstam
**Critical design**: Anthony Dunne & Fiona Raby, Matt Ratto, Carl DiSalvo
**Digital humanities**: Lisa Gitelman, Catherine D'Ignazio & Lauren Klein

### Artistic projects with open-source components (flagged ✓)

| Project | Artist | Open-Source? | Repository |
|---------|--------|--------------|------------|
| Stranger Visions | Dewey-Hagborg | ✓ | github.com/hdeweyh/strangerVisions |
| DFACE.app / VFRAME | Harvey | ✓ | Open-source tools |
| p5.js | McCarthy | ✓ | p5js.org |
| ImageNet Roulette | Paglen/Crawford | Partial | Caffe framework |
| Tracking Transience | Elahi | ✓ | elahi.gmu.edu/track/ |
| Facial Weaponization | Blas | Workshop method | Published writings |
| Data-Masks | Crispin | Thesis available | Methodology documented |

### Core technical tools

**Creative coding**: p5.js, ml5.js (FaceMesh, BodyPose), Three.js
**Face detection**: face-api.js, OpenCV, dlib, face_recognition
**Face generation**: StyleGAN2/3, Pix2Pix, RunwayML
**Documentation**: Datasheets for Datasets, Model Cards

### Publication venues

**Journals**: Leonardo, Digital Creativity, Journal of Artistic Research
**Conferences**: SIGGRAPH Art Papers, DIS, ISEA, CHI
**Festivals**: Ars Electronica, transmediale, Fotomuseum Winterthur