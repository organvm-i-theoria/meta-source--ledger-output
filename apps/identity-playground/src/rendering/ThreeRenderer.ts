import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VisualConfig, NumerologyProfile } from '../core/types';
import { Phyllotaxis } from '../proportions/Phyllotaxis';

/**
 * Convert hex color to Three.js Color
 */
function hexToThreeColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

export class ThreeRenderer {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private controls: OrbitControls | null = null;
  private particles: THREE.Points | null = null;
  private config: VisualConfig;
  private profile: NumerologyProfile | null = null;
  private animationId: number | null = null;
  private container: HTMLElement | null = null;
  private time: number = 0;
  private isPlaying: boolean = true;

  constructor(config: VisualConfig) {
    this.config = config;
  }

  updateConfig(config: VisualConfig) {
    this.config = config;
    this.updateParticles();
  }

  updateProfile(profile: NumerologyProfile | null) {
    this.profile = profile;
    this.updateParticles();
  }

  setPlaying(playing: boolean) {
    this.isPlaying = playing;
  }

  private updateParticles() {
    if (!this.scene || !this.particles) return;

    // Remove old particles
    this.scene.remove(this.particles);

    // Create new particles
    this.createParticles();
  }

  private createParticles() {
    if (!this.scene) return;

    const spreadBase = this.profile ? (this.profile.destiny ?? this.profile.expression ?? 3) + 5 : 8;
    const points = Phyllotaxis.generate(this.config.pointCount, spreadBase);

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);

    const baseColor = hexToThreeColor(this.config.colorPrimary);

    points.forEach((pt, i) => {
      // Convert 2D phyllotaxis to 3D sphere mapping
      const phi = (pt.index * 0.618033988749895 * Math.PI * 2) % (Math.PI * 2);
      const theta = Math.acos(1 - 2 * (pt.index / points.length));
      const radius = 50 + pt.radius * 0.5;

      positions[i * 3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(theta);

      // Color variation
      const hsl = { h: 0, s: 0, l: 0 };
      baseColor.getHSL(hsl);
      const variedColor = new THREE.Color();
      variedColor.setHSL(
        (hsl.h + (pt.index * 0.001)) % 1,
        Math.max(0.5, hsl.s),
        Math.min(0.9, hsl.l + 0.1)
      );

      colors[i * 3] = variedColor.r;
      colors[i * 3 + 1] = variedColor.g;
      colors[i * 3 + 2] = variedColor.b;
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material
    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = () => {
    if (!this.scene || !this.camera || !this.renderer || !this.controls) return;

    this.animationId = requestAnimationFrame(this.animate);

    if (this.isPlaying) {
      this.time += this.config.animationSpeed * 0.01;

      // Rotate particles
      if (this.particles) {
        this.particles.rotation.y = this.time * 0.5;
        this.particles.rotation.x = Math.sin(this.time * 0.3) * 0.2;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  initialize(containerId: string) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 600;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 150;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Create initial particles
    this.createParticles();

    // Handle resize
    window.addEventListener('resize', this.handleResize);

    // Start animation
    this.animate();
  }

  private handleResize = () => {
    if (!this.container || !this.camera || !this.renderer) return;

    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    window.removeEventListener('resize', this.handleResize);

    if (this.renderer && this.container) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }

    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.Material).dispose();
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.particles = null;
  }
}
