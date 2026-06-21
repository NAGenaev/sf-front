"use client";

import {
  motion,
  type Variants,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";
import {
  Camera,
  MapPin,
  Star,
  Award,
  Clock,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Sun,
  Moon,
  ArrowLeft,
  ArrowRight,
  Aperture,
  Sparkles,
  Users,
  SlidersHorizontal,
  Languages,
} from "lucide-react";
import { useEffect, useState, useCallback, useMemo, useId, useRef, memo, useLayoutEffect } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageProvider";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, SingleOrMultiple } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import studio1Img from "./pic/1.webp";
import studio2Img from "./pic/2.webp";
import studio3Img from "./pic/3.webp";
import studio4Img from "./pic/4.webp";
import studio5Img from "./pic/5.webp";

// Hero Section with Shapes
function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-foreground/10",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-foreground/10",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/90 dark:text-foreground/80 shadow-sm backdrop-blur-md transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-pressed={isDark}
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span>{isDark ? "Dark" : "Light"}</span>
      <span
        className={cn(
          "flex h-6 w-10 items-center rounded-full border border-border bg-background px-1",
          "transition-colors",
        )}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] font-bold text-primary",
            "shadow-sm",
            isDark
              ? "translate-x-4 bg-primary/20"
              : "translate-x-0 bg-primary/10",
          )}
        >
          {isDark ? "D" : "L"}
        </motion.span>
      </span>
    </motion.button>
  );
}

function LanguageToggle() {
  const { locale, toggleLocale, t } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLocale}
      className="flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-foreground/90 dark:text-foreground/80 shadow-sm backdrop-blur-md transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      aria-label={t.lang.toggle}
    >
      <Languages className="h-4 w-4" />
      <span>{locale === "en" ? "EN" : "RU"}</span>
      <span className="flex h-6 w-10 items-center rounded-full border border-border bg-background px-1">
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={cn(
            "inline-flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] font-bold text-primary shadow-sm",
            locale === "ru"
              ? "translate-x-4 bg-primary/20"
              : "translate-x-0 bg-primary/10",
          )}
        >
          {locale === "en" ? "E" : "R"}
        </motion.span>
      </span>
    </motion.button>
  );
}

const scrollViewport = { once: true, amount: 0.2 };

function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={scrollViewport}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========== SHADER BACKGROUND COMPONENT ==========
// Шейдерный фон с эффектом волн и дымки
interface ShaderPlaneProps {
  vertexShader: string;
  fragmentShader: string;
  uniforms: { [key: string]: { value: unknown } };
}

function ShaderPlane({
  vertexShader,
  fragmentShader,
  uniforms,
}: ShaderPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      // Замедляем анимацию: уменьшаем множитель с 0.5 до 0.2
      material.uniforms.u_time.value = state.clock.elapsedTime * 0.2;
      material.uniforms.u_resolution.value.set(size.width, size.height, 1.0);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function ThemeCanvasSync() {
  const { gl, size, invalidate } = useThree();

  useEffect(() => {
    const syncCanvas = () => {
      requestAnimationFrame(() => {
        gl.setSize(size.width, size.height);
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        invalidate();
      });
    };

    syncCanvas();

    const observer = new MutationObserver(syncCanvas);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [gl, size.width, size.height, invalidate]);

  return null;
}

interface ShaderBackgroundProps {
  vertexShader?: string;
  fragmentShader?: string;
  uniforms?: { [key: string]: { value: unknown } };
  className?: string;
}

function ShaderBackground({
  vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
    precision highp float;

    varying vec2 vUv;
    uniform float u_time;
    uniform vec3 u_resolution;

    #define STEP 256
    #define EPS .001

    float smin( float a, float b, float k )
    {
        float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
        return mix( b, a, h ) - k*h*(1.0-h);
    }

    const mat2 m = mat2(.8,.6,-.6,.8);

    float noise( in vec2 x )
    {
      return sin(1.5*x.x)*sin(1.5*x.y);
    }

    float fbm6( vec2 p )
    {
        float f = 0.0;
        f += 0.500000*(0.5+0.5*noise( p )); p = m*p*2.02;
        f += 0.250000*(0.5+0.5*noise( p )); p = m*p*2.03;
        f += 0.125000*(0.5+0.5*noise( p )); p = m*p*2.01;
        f += 0.062500*(0.5+0.5*noise( p )); p = m*p*2.04;
        f += 0.015625*(0.5+0.5*noise( p ));
        return f/0.96875;
    }

    mat2 getRot(float a)
    {
        float sa = sin(a), ca = cos(a);
        return mat2(ca,-sa,sa,ca);
    }

    vec3 _position;

    float sphere(vec3 center, float radius)
    {
        return distance(_position,center) - radius;
    }

    float swingPlane(float height)
    {
        // Замедляем движение волн: уменьшаем множитель с 5.5 до 2.5
        vec3 pos = _position + vec3(0.,0.,u_time * 2.5);
        float def =  fbm6(pos.xz * .25) * 0.5;
        float way = pow(abs(pos.x) * 34. ,2.5) *.0000125;
        def *= way;
        float ch = height + def;
        return max(pos.y - ch,0.);
    }

    float map(vec3 pos)
    {
        _position = pos;
        float dist;
        dist = swingPlane(0.);
        float sminFactor = 5.25;
        dist = smin(dist,sphere(vec3(0.,-15.,80.),60.),sminFactor);
        return dist;
    }

    vec3 getNormal(vec3 pos)
    {
        vec3 nor = vec3(0.);
        vec3 vv = vec3(0.,1.,-1.)*.01;
        nor.x = map(pos + vv.zxx) - map(pos + vv.yxx);
        nor.y = map(pos + vv.xzx) - map(pos + vv.xyx);
        nor.z = map(pos + vv.xxz) - map(pos + vv.xxy);
        nor /= 2.;
        return normalize(nor);
    }

    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
      vec2 uv = (fragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
      vec3 rayOrigin = vec3(uv + vec2(0.,6.), -1. );
      vec3 rayDir = normalize(vec3(uv , 1.));
      rayDir.zy = getRot(.15) * rayDir.zy;
      vec3 position = rayOrigin;
      float curDist;
      int nbStep = 0;
      
      for(; nbStep < STEP;++nbStep)
      {
          curDist = map(position);
          if(curDist < EPS)
              break;
          position += rayDir * curDist * .5;
      }
      
      float f;
      float dist = distance(rayOrigin,position);
      f = dist /(98.);
      f = float(nbStep) / float(STEP);
      // Увеличиваем яркость для большей выразительности: с 0.9 до 1.2
      f *= 1.2;
      // Добавляем контраст для большей выразительности
      f = pow(f, 0.85);
      vec3 col = vec3(f);
      fragColor = vec4(col,1.0);
    }
    
    void main() {
      vec4 fragColor;
      vec2 fragCoord = vUv * u_resolution.xy;
      mainImage(fragColor, fragCoord);
      gl_FragColor = fragColor;
    }
  `,
  uniforms = {},
  className = "w-full h-full",
}: ShaderBackgroundProps) {
  const shaderUniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector3(1, 1, 1) },
      ...uniforms,
    }),
    [uniforms],
  );

  return (
    <div className={className}>
      <Canvas className={className} frameloop="always" dpr={[1, 2]}>
        <ThemeCanvasSync />
        <ShaderPlane
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={shaderUniforms}
        />
      </Canvas>
    </div>
  );
}

// ========== SPARKLES CORE COMPONENT ==========
// Эффект частиц для фона
type SparklesCoreProps = {
  id?: string;
  className?: string;
  background?: string;
  particleSize?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
};

function SparklesCore(props: SparklesCoreProps) {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: background || "transparent",
              },
            },
            fullScreen: {
              enable: false,
              zIndex: 1,
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true as any,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              bounce: {
                horizontal: {
                  value: 1,
                },
                vertical: {
                  value: 1,
                },
              },
              collisions: {
                absorb: {
                  speed: 2,
                },
                bounce: {
                  horizontal: {
                    value: 1,
                  },
                  vertical: {
                    value: 1,
                  },
                },
                enable: false,
                maxSpeed: 50,
                mode: "bounce",
                overlap: {
                  enable: true,
                  retries: 0,
                },
              },
              color: {
                value: particleColor || "#ffffff",
                animation: {
                  h: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  s: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                  l: {
                    count: 0,
                    enable: false,
                    speed: 1,
                    decay: 0,
                    delay: 0,
                    sync: true,
                    offset: 0,
                  },
                },
              },
              effect: {
                close: true,
                fill: true,
                options: {},
                type: {} as SingleOrMultiple<string> | undefined,
              },
              groups: {},
              move: {
                angle: {
                  offset: 0,
                  value: 90,
                },
                attract: {
                  distance: 200,
                  enable: false,
                  rotate: {
                    x: 3000,
                    y: 3000,
                  },
                },
                center: {
                  x: 50,
                  y: 50,
                  mode: "percent",
                  radius: 0,
                },
                decay: 0,
                distance: {},
                direction: "none",
                drift: 0,
                enable: true,
                gravity: {
                  acceleration: 9.81,
                  enable: false,
                  inverse: false,
                  maxSpeed: 50,
                },
                path: {
                  clamp: true,
                  delay: {
                    value: 0,
                  },
                  enable: false,
                  options: {},
                },
                outModes: {
                  default: "out",
                },
                random: false,
                size: false,
                speed: {
                  min: 0.1,
                  max: speed || 1,
                },
                spin: {
                  acceleration: 0,
                  enable: false,
                },
                straight: false,
                trail: {
                  enable: false,
                  length: 10,
                  fill: {},
                },
                vibrate: false,
                warp: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 400,
                  height: 400,
                },
                limit: {
                  mode: "delete",
                  value: 0,
                },
                value: particleDensity || 120,
              },
              opacity: {
                value: {
                  min: 0.1,
                  max: 1,
                },
                animation: {
                  count: 0,
                  enable: true,
                  speed: speed || 4,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              reduceDuplicates: false,
              shadow: {
                blur: 0,
                color: {
                  value: "#000",
                },
                enable: false,
                offset: {
                  x: 0,
                  y: 0,
                },
              },
              shape: {
                close: true,
                fill: true,
                options: {},
                type: "circle",
              },
              size: {
                value: {
                  min: minSize || 1,
                  max: maxSize || 3,
                },
                animation: {
                  count: 0,
                  enable: false,
                  speed: 5,
                  decay: 0,
                  delay: 0,
                  sync: false,
                  mode: "auto",
                  startValue: "random",
                  destroy: "none",
                },
              },
              stroke: {
                width: 0,
              },
              zIndex: {
                value: 0,
                opacityRate: 1,
                sizeRate: 1,
                velocityRate: 1,
              },
              destroy: {
                bounds: {},
                mode: "none",
                split: {
                  count: 1,
                  factor: {
                    value: 3,
                  },
                  rate: {
                    value: {
                      min: 4,
                      max: 9,
                    },
                  },
                  sizeOffset: true,
                },
              },
              roll: {
                darken: {
                  enable: false,
                  value: 0,
                },
                enable: false,
                enlighten: {
                  enable: false,
                  value: 0,
                },
                mode: "vertical",
                speed: 25,
              },
              tilt: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                enable: false,
              },
              twinkle: {
                lines: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
                particles: {
                  enable: false,
                  frequency: 0.05,
                  opacity: 1,
                },
              },
              wobble: {
                distance: 5,
                enable: false,
                speed: {
                  angle: 50,
                  move: 10,
                },
              },
              life: {
                count: 0,
                delay: {
                  value: 0,
                  sync: false,
                },
                duration: {
                  value: 0,
                  sync: false,
                },
              },
              rotate: {
                value: 0,
                animation: {
                  enable: false,
                  speed: 0,
                  decay: 0,
                  sync: false,
                },
                direction: "clockwise",
                path: false,
              },
              orbit: {
                animation: {
                  count: 0,
                  enable: false,
                  speed: 1,
                  decay: 0,
                  delay: 0,
                  sync: false,
                },
                enable: false,
                opacity: 1,
                rotation: {
                  value: 45,
                },
                width: 1,
              },
              links: {
                blink: false,
                color: {
                  value: "#fff",
                },
                consent: false,
                distance: 100,
                enable: false,
                frequency: 1,
                opacity: 1,
                shadow: {
                  blur: 5,
                  color: {
                    value: "#000",
                  },
                  enable: false,
                },
                triangles: {
                  enable: false,
                  frequency: 1,
                },
                width: 1,
                warp: false,
              },
              repulse: {
                value: 0,
                enabled: false,
                distance: 1,
                duration: 1,
                factor: 1,
                speed: 1,
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
}

const HERO_MESH_TEXTURE =
  "data:image/svg+xml,%3Csvg%20width%3D%22160%22%20height%3D%22160%22%20viewBox%3D%220%200%20160%20160%22%20fill%3D%22none%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M0%200L160%20160M160%200L0%20160%22%20stroke%3D%22white%22%20stroke-width%3D%220.8%22/%3E%3C/g%3E%3C/svg%3E";

const BRAND_LOGOS = [
  "Canon",
  "Profoto",
  "Adobe",
  "Moment",
  "Sigma",
  "Phase One",
  "Apple",
  "Zendesk",
];

const BrandMarquee = memo(function BrandMarquee() {
  return (
    <div className="relative isolate mt-12 overflow-hidden rounded-full border border-border bg-muted/55 py-4 dark:border-border/50 dark:bg-background/70">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-muted/55 via-muted/30 to-transparent dark:from-background/70 dark:via-background/40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-muted/55 via-muted/30 to-transparent dark:from-background/70 dark:via-background/40" />
      <div
        className="flex w-max items-center gap-12 text-sm font-semibold tracking-[0.32em] uppercase text-foreground/75 dark:text-foreground/55"
        style={{
          animation: "marquee-scroll 28s linear infinite",
          willChange: "transform",
        }}
      >
        {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="flex shrink-0 items-center gap-3 whitespace-nowrap"
          >
            <span className="size-1 shrink-0 rounded-full bg-foreground/55 dark:bg-foreground/40" />
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
});

const HeroCollageGlow = memo(function HeroCollageGlow() {
  return (
    <motion.div
      initial={{ opacity: 0.35, scale: 0.96 }}
      animate={{ opacity: [0.3, 0.55, 0.4], scale: [0.96, 1, 0.98] }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 10,
        ease: "easeInOut",
      }}
      className="absolute inset-0 rounded-[38px] border border-border/55 bg-background/85 backdrop-blur-2xl dark:border-border/40 dark:bg-background/40"
    />
  );
});

const HeroBackground = memo(function HeroBackground() {
  const lightRays = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        rotation: -10 + i * 7,
        delay: i * 1.2,
      })),
    [],
  );

  const backgroundOrbs = useMemo(
    () => [
      {
        className:
          "absolute -left-28 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.26),transparent_68%)] blur-[75px]",
        animate: {
          x: [-18, 38, -12],
          y: [-18, -32, 20],
          scale: [1, 1.1, 1.04],
        },
      },
      {
        className:
          "absolute right-[-12%] top-[22%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.22),transparent_62%)] blur-[90px]",
        animate: {
          x: [18, -34, 18],
          y: [4, 34, -22],
          scale: [1.02, 0.94, 1.08],
        },
      },
      {
        className:
          "absolute left-1/2 bottom-[-26%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_110deg_at_50%_50%,rgba(255,255,255,0.14),transparent_60%,rgba(255,255,255,0.08))]",
        animate: {
          rotate: [0, 160, 320],
          scale: [0.9, 1.05, 0.98],
        },
      },
    ],
    [],
  );

  return (
    <>
      <div className="ui-scale-cancel pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background dark:from-background/95 dark:via-background/85 dark:to-background/90" />

        <div className="absolute inset-0 opacity-20 mix-blend-normal transition-[opacity,mix-blend-mode] duration-300 ease-out dark:opacity-[0.55] dark:mix-blend-screen">
          <ShaderBackground className="h-full w-full" />
        </div>

        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out dark:opacity-100">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.35, 0.25] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 20,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.15), transparent 50%), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.12), transparent 55%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.08), transparent 60%)",
              transform: "scale(1.08)",
            }}
          />

          {backgroundOrbs.map((orb, index) => (
            <motion.div
              key={index}
              className={orb.className}
              initial={{ opacity: 0.1 }}
              animate={{
                opacity: [0.12, 0.26, 0.15],
                ...orb.animate,
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 20 + index * 5,
                ease: "easeInOut",
              }}
            />
          ))}

          {lightRays.map((ray) => (
            <motion.div
              key={ray.id}
              className="absolute left-1/2 top-[-28%] h-[140%] w-[32rem] -translate-x-1/2 rounded-[999px] bg-[linear-gradient(120deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0.03)_70%,rgba(255,255,255,0)_95%)]"
              style={{ rotate: `${ray.rotation}deg` }}
              initial={{ opacity: 0.12, scale: 0.92 }}
              animate={{ opacity: [0.12, 0.28, 0.16], scale: [0.92, 1.08, 0.98] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                duration: 18,
                delay: ray.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(5,5,5,0)_42%,rgba(5,5,5,0)_58%,rgba(255,255,255,0.05)_100%)]" />
        </div>

        <div className="absolute inset-0 opacity-45 transition-opacity duration-300 ease-out dark:opacity-100">
          <motion.div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              backgroundImage: `url(${HERO_MESH_TEXTURE})`,
              backgroundSize: "180px 180px",
            }}
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.2, 0.14] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 14,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_60%,rgba(0,0,0,0.03)_100%)]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-[hsl(var(--background))]/75" />
      </div>
    </>
  );
});

const HeroSection = memo(function HeroSection() {
  const { t } = useLanguage();
  const heroPhotoImages = [studio1Img, studio2Img, studio4Img];
  const heroPhotos = t.hero.photos.map((photo, index) => ({
    ...photo,
    src: heroPhotoImages[index],
  }));
  const highlightIcons = [Aperture, SlidersHorizontal, Users, Sparkles];
  const heroHighlights = t.hero.highlights.map((item, index) => ({
    ...item,
    Icon: highlightIcons[index],
  }));
  const heroStats = t.hero.stats;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxTransforms = heroPhotos.map((_, index) => ({
    x: useTransform(mouseX, (v) => v * (12 - index * 4)),
    y: useTransform(mouseY, (v) => v * (10 - index * 3)),
  }));

  const handleMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: 0.25 + i * 0.14,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const collagePositions = [
    "top-0 left-0",
    "top-16 right-[-6%]",
    "bottom-0 left-[18%]",
  ];

  return (
    <section
      className="hero-viewport relative flex items-center overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 lg:px-16">
        <div className="relative overflow-hidden rounded-[3.5rem] border border-border/60 bg-background/95 shadow-[0_60px_160px_-70px_rgba(0,0,0,0.18)] backdrop-blur-2xl dark:border-border/35 dark:bg-background/72 dark:shadow-[0_60px_160px_-70px_rgba(0,0,0,0.55)]">
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/90 via-background/50 to-transparent dark:from-background/55 dark:via-background/30" />
          <div className="grid gap-16 px-6 py-16 text-center lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:px-16 lg:py-24 lg:text-left">
            <div className="mx-auto max-w-2xl space-y-10 lg:mx-0">
              <motion.div
                custom={0}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.06] px-5 py-2 text-sm font-semibold uppercase tracking-[0.28em] dark:border-foreground/10 dark:bg-foreground/[0.05]"
              >
                <Camera className="h-4 w-4" />
                {t.hero.badge}
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="font-display text-4xl font-medium leading-[1.06] tracking-[-0.02em] text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem]"
              >
                {t.hero.title}
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="text-base text-foreground/82 dark:text-foreground/70 sm:text-lg"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap items-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition hover:bg-primary/80"
                >
                  <Camera className="h-4 w-4" />
                  {t.hero.ctaFind}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full border border-border/70 px-8 py-4 text-sm font-medium uppercase tracking-wide text-foreground transition hover:border-foreground/60 hover:bg-foreground/10"
                >
                  {t.hero.ctaPartner}
                </motion.button>
              </motion.div>
            </div>

            <div className="relative hidden h-[520px] w-full max-w-[480px] justify-self-end lg:flex">
              <HeroCollageGlow />
              {heroPhotos.map((photo, index) => (
                <motion.div
                  key={photo.label}
                  style={{
                    x: parallaxTransforms[index].x,
                    y: parallaxTransforms[index].y,
                  }}
                  className={cn(
                    "absolute rounded-3xl border border-border/55 bg-background/90 p-4 backdrop-blur-xl shadow-[0_24px_60px_-28px_rgba(0,0,0,0.12)] transition-all duration-500 dark:border-border/40 dark:bg-background/45 dark:shadow-[0_24px_60px_-28px_rgba(255,255,255,0.22)]",
                    collagePositions[index],
                    index === 0 ? "w-[260px]" : "w-[240px]",
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-border/60">
                    <motion.img
                      src={photo.src}
                      alt={photo.label}
                      loading="lazy"
                      decoding="async"
                      className="h-[260px] w-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm font-semibold text-foreground">
                      {photo.label}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground/62 dark:text-foreground/50">
                      {photo.meta}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex w-full gap-4 overflow-x-auto pb-2 lg:hidden">
              {heroPhotos.map((photo) => (
                <div
                  key={photo.label}
                  className="min-w-[260px] flex-1 rounded-3xl border border-border/55 bg-background/90 p-4 backdrop-blur dark:border-border/40 dark:bg-background/40"
                >
                  <div className="overflow-hidden rounded-2xl border border-border/60">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      loading="lazy"
                      decoding="async"
                      className="h-[240px] w-full object-cover"
                    />
                  </div>
                  <div className="pt-3">
                    <p className="text-sm font-semibold text-foreground">
                      {photo.label}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground/62 dark:text-foreground/50">
                      {photo.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== UNIFIED WORK AREA: MODULES + STATS ========== */}
          <div className="border-t border-border/50 px-6 py-8 lg:px-16 lg:py-12 dark:border-border/30">
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {heroHighlights.map(({ Icon, title, caption }) => (
                <motion.div
                  key={title}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-border/55 bg-background/90 p-6 backdrop-blur-xl transition duration-300 hover:border-foreground/50 hover:bg-background hover:shadow-lg dark:border-border/40 dark:bg-background/60 dark:hover:bg-background/80"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background/90 text-foreground shadow-sm transition group-hover:bg-foreground group-hover:text-background group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col gap-1.5 text-left">
                    <span className="text-base font-semibold text-foreground">
                      {title}
                    </span>
                    <span className="text-xs uppercase tracking-[0.28em] text-foreground/62 dark:text-foreground/50 leading-relaxed">
                      {caption}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="group flex flex-col gap-2.5 rounded-2xl border border-border/55 bg-background/90 px-6 py-6 backdrop-blur-xl transition duration-300 hover:border-foreground/50 hover:bg-background hover:shadow-lg dark:border-border/40 dark:bg-background/55 dark:hover:bg-background/75"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <span className="text-xs font-medium uppercase tracking-[0.32em] text-foreground/62 dark:text-foreground/50">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-bold text-foreground lg:text-4xl">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <BrandMarquee />
        </div>
      </div>
    </section>
  );
});
function FeaturesSection() {
  const { t } = useLanguage();
  const featureIcons = [
    <Camera key="camera" className="w-6 h-6" />,
    <Clock key="clock" className="w-6 h-6" />,
    <Award key="award" className="w-6 h-6" />,
    <Star key="star" className="w-6 h-6" />,
  ];
  const features = t.features.items.map((item, index) => ({
    ...item,
    icon: featureIcons[index],
  }));

  return (
    <div className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.features.title}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.features.subtitle}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.08}
              className="p-6 rounded-xl border border-border bg-card backdrop-blur-sm hover:border-foreground/40 transition-all duration-300 group dark:bg-card/80"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedStudiosSection() {
  const { t } = useLanguage();
  const studioImages = [
    studio1Img,
    studio2Img,
    studio4Img,
    studio3Img,
    studio5Img,
  ];
  const studios = t.featured.studios.map((studio, index) => ({
    ...studio,
    img: studioImages[index],
  }));

  const [currentStudioIndex, setCurrentStudioIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    calculateItemsPerView();
    window.addEventListener("resize", calculateItemsPerView);

    return () => window.removeEventListener("resize", calculateItemsPerView);
  }, []);

  const totalStudios = studios.length;
  const visibleCount = Math.min(itemsPerView, totalStudios);

  const visibleStudios = Array.from({ length: visibleCount }, (_, i) => {
    const index = (currentStudioIndex + i) % totalStudios;
    return { ...studios[index], key: `${studios[index].name}-${index}` };
  });

  const handlePrev = () => {
    setCurrentStudioIndex((prev) => (prev - 1 + totalStudios) % totalStudios);
  };

  const handleNext = () => {
    setCurrentStudioIndex((prev) => (prev + 1) % totalStudios);
  };

  return (
    <section className="relative overflow-hidden border-y border-border/70 bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="container relative mx-auto px-4 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-foreground/[0.04] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            {t.featured.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold md:text-5xl"
          >
            {t.featured.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={scrollViewport}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground md:text-xl"
          >
            {t.featured.subtitle}
          </motion.p>
        </div>

        <div className="relative mt-16">
          <div className="flex items-center justify-end gap-3 pb-4 md:pb-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={t.featured.prevStudio}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={t.featured.nextStudio}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition hover:bg-foreground hover:text-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-7">
            {visibleStudios.map((studio, index) => (
              <motion.div
                key={studio.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={scrollViewport}
                transition={{ delay: index * 0.08 }}
                className="group relative w-full overflow-hidden rounded-3xl border border-border bg-card backdrop-blur-md md:flex-1 dark:border-border/60 dark:bg-card/60"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={studio.img}
                    alt={studio.name}
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/85" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/70">
                        {studio.city}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80 backdrop-blur">
                        {studio.size}
                      </span>
                    </div>
                    <h3 className="mt-3 text-2xl font-semibold text-white">
                      {studio.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground backdrop-blur dark:border-border/60 dark:bg-background/80">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t.featured.metro}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    24/7
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function TestimonialsSection() {
  const { t } = useLanguage();
  const testimonials = t.testimonials.items.map((item) => ({
    ...item,
    rating: 5,
  }));

  return (
    <div className="bg-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.testimonials.title}</h2>
          <p className="text-muted-foreground text-lg">
            {t.testimonials.subtitle}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal
              key={testimonial.name}
              delay={index * 0.1}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                {testimonial.content}
              </p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// Pricing Section
function PricingSection() {
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);
  const prices = [
    { monthly: 99, yearly: 990 },
    { monthly: 299, yearly: 2990 },
    { monthly: 499, yearly: 4990 },
  ];
  const popularFlags = [false, true, false];
  const plans = t.pricing.plans.map((plan, index) => ({
    ...plan,
    price: isYearly ? prices[index].yearly : prices[index].monthly,
    popular: popularFlags[index],
  }));

  return (
    <div className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.pricing.title}</h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t.pricing.subtitle}
          </p>
          <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "px-6 py-2 rounded-full transition-all",
                !isYearly ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              {t.pricing.month}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "px-6 py-2 rounded-full transition-all",
                isYearly ? "bg-background shadow-sm" : "text-muted-foreground",
              )}
            >
              {t.pricing.year}
            </button>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <ScrollReveal
              key={plan.name}
              delay={index * 0.1}
              className={cn(
                "p-8 rounded-xl border bg-card backdrop-blur-sm transition-all duration-300 dark:bg-card/80",
                plan.popular
                  ? "border-primary shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)] scale-105 dark:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
                  : "border-border",
              )}
            >
              {plan.popular && (
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  {t.pricing.popular}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}₽</span>
                <span className="text-muted-foreground">
                  /{isYearly ? t.pricing.perYear : t.pricing.perMonth}
                </span>
              </div>
              <button
                className={cn(
                  "w-full py-3 rounded-lg font-semibold transition-all",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "border border-border bg-muted/30 hover:bg-muted/50 dark:border-border/80 dark:bg-background/80 dark:hover:bg-background",
                )}
              >
                {t.pricing.choosePlan}
              </button>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// Proof Section
function ProofSection() {
  const { t } = useLanguage();
  const stats = t.proof.stats;

  return (
    <div className="bg-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.proof.title}</h2>
          <p className="text-muted-foreground text-lg">{t.proof.subtitle}</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.08} className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// FAQ Section
function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = t.faq.items;

  return (
    <div className="bg-background py-20">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.faq.title}</h2>
          <p className="text-muted-foreground text-lg">{t.faq.subtitle}</p>
        </ScrollReveal>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ScrollReveal
              key={faq.question}
              delay={index * 0.08}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-muted-foreground">{faq.answer}</div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Section
function ContactSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-muted/30 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ScrollReveal>
            <h2 className="text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t.contact.subtitle}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.email}</p>
                  <p className="text-muted-foreground">
                    support@studiofinder.ru
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.phone}</p>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/80">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{t.contact.address}</p>
                  <p className="text-muted-foreground">
                    {t.contact.addressValue}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.12} className="bg-card border border-border rounded-xl p-8">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/70"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/70"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2 focus:outline-none focus:ring-2 focus:ring-foreground/70"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/80"
              >
                {t.contact.submit}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

// Footer
function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {[
            (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <Camera className="w-8 h-8 text-primary" />
                  <span className="text-xl font-bold">StudioFinder</span>
                </div>
                <p className="text-muted-foreground text-sm">{t.footer.tagline}</p>
              </>
            ),
            (
              <>
                <h3 className="font-semibold mb-4">{t.footer.company}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.about}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.blog}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.careers}
                    </a>
                  </li>
                </ul>
              </>
            ),
            (
              <>
                <h3 className="font-semibold mb-4">{t.footer.support}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.help}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.contacts}
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      {t.footer.faq}
                    </a>
                  </li>
                </ul>
              </>
            ),
            (
              <>
                <h3 className="font-semibold mb-4">{t.footer.social}</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </>
            ),
          ].map((column, index) => (
            <ScrollReveal key={index} delay={index * 0.06} y={20}>
              {column}
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={0.2} y={16}>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>{t.footer.copyright}</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

function LandingContent() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }
    const stored = window.localStorage.getItem("sf-theme");
    if (stored === "light") return false;
    if (stored === "dark") return true;
    return true;
  });

  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkTheme);
    window.localStorage.setItem("sf-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  return (
    <div className="ui-scale relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/8 via-transparent to-transparent blur-3xl dark:from-primary/20" />

      <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle
          isDark={isDarkTheme}
          onToggle={() => setIsDarkTheme((prev) => !prev)}
        />
      </div>

      <HeroSection />
      <FeaturedStudiosSection />
      <FeaturesSection />
      <ProofSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// Main Component
export default function StudioFinderLanding() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}
