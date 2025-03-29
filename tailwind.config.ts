
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				cosmic: {
					DEFAULT: '#7950f2',
					dark: '#5f3dc4',
					light: '#9775fa',
					accent: '#4cc9f0',
					background: '#0A0A20'
				},
				saturn: {
					DEFAULT: '#E6AD4C',
					light: '#F7C876',
					dark: '#C08529'
				},
				space: {
					DEFAULT: '#121220',
					dark: '#0A0A20',
					light: '#222235'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'twinkle': {
					'0%, 100%': { opacity: '0.5' },
					'50%': { opacity: '1' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': { 
						opacity: '1',
						boxShadow: '0 0 20px rgba(121, 80, 242, 0.5)'
					},
					'50%': { 
						opacity: '0.8',
						boxShadow: '0 0 30px rgba(121, 80, 242, 0.8)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'twinkle': 'twinkle 4s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 60s linear infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite'
			},
			fontFamily: {
				'cosmic': ['Poppins', 'sans-serif']
			},
			backgroundImage: {
				'stars': 'url("/stars-bg.svg")',
				'cosmic-gradient': 'linear-gradient(to right, #7950f2, #4cc9f0)',
				'cosmic-radial': 'radial-gradient(circle at center, #7950f2, #0A0A20)',
				'saturn-gradient': 'linear-gradient(to right, #E6AD4C, #C08529)',
				'glass-card': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))'
			},
			boxShadow: {
				'neon': '0 0 5px rgba(121, 80, 242, 0.2), 0 0 20px rgba(121, 80, 242, 0.2), 0 0 40px rgba(121, 80, 242, 0.2)',
				'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
