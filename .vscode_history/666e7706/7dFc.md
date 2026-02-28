<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Contact Section</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        // Matching your portfolio's main.css variables
                        brand: {
                            accent: '#FF5722',       // The deep orange
                            'accent-strong': '#FF4D00',
                            'accent-soft': '#FFF3EB', // Light orange bg
                            dark: '#111111',
                            muted: '#6b6b6b',
                            bg: '#f8fafc',
                            surface: '#ffffff',
                            border: '#eaeaea'
                        }
                    },
                    animation: {
                        'float': 'float 8s ease-in-out infinite',
                        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0)' },
                            '50%': { transform: 'translateY(-20px)' },
                        }
                    },
                    boxShadow: {
                        'soft': '0 20px 60px -15px rgba(0, 0, 0, 0.05)',
                        'glow': '0 0 40px -10px rgba(255, 87, 34, 0.15)'
                    }
                }
            }
        }
    </script>
    <style>
        /* Modern minimal input styling */
        .modern-input {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background-color: #f8fafc;
            border: 1px solid transparent;
        }
        .modern-input:focus {
            background-color: #ffffff;
            border-color: #FF5722;
            box-shadow: 0 0 0 4px rgba(255, 87, 34, 0.1);
            outline: none;
        }
        .modern-input::placeholder {
            color: #94a3b8;
        }
    </style>
</head>
<body class="bg-brand-bg text-slate-800 min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans">

    <!-- Section Wrapper -->
    <section class="relative w-full max-w-6xl mx-auto">
        
        <!-- Creative Background Elements (Minimalist Glows) -->
        <div class="absolute top-[-100px] left-[-100px] w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl animate-float -z-10"></div>
        <div class="absolute bottom-[-50px] right-[-50px] w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl animate-pulse-slow -z-10"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            <!-- Left Side: Minimal Context -->
            <div class="lg:col-span-5 pt-8 lg:sticky lg:top-12">
                <span class="inline-block py-1 px-3 rounded-md bg-brand-accent-soft text-brand-accent text-xs font-bold tracking-widest uppercase mb-6">
                    Contact
                </span>
                
                <h2 class="text-4xl md:text-5xl font-extrabold text-brand-dark leading-tight mb-6 tracking-tight">
                    Let's streamline <br>your <span class="text-brand-accent">operations.</span>
                </h2>
                
                <p class="text-brand-muted text-lg leading-relaxed mb-10 max-w-md">
                    Ready to automate your workflows? I help leaders build systems that save time and reduce errors.
                </p>

                <!-- Minimal Contact Details -->
                <div class="space-y-6">
                    <a href="mailto:hello@example.com" class="flex items-center group">
                        <div class="w-12 h-12 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-dark group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300 shadow-sm">
                            <i data-lucide="mail" class="w-5 h-5"></i>
                        </div>
                        <div class="ml-5">
                            <p class="text-xs text-brand-muted font-bold uppercase tracking-wider mb-0.5">Email me at</p>
                            <p class="text-brand-dark font-medium text-lg">hello@example.com</p>
                        </div>
                    </a>

                    <a href="#" class="flex items-center group">
                        <div class="w-12 h-12 rounded-2xl bg-white border border-brand-border flex items-center justify-center text-brand-dark group-hover:bg-brand-accent group-hover:text-white group-hover:border-brand-accent transition-all duration-300 shadow-sm">
                            <i data-lucide="map-pin" class="w-5 h-5"></i>
                        </div>
                        <div class="ml-5">
                            <p class="text-xs text-brand-muted font-bold uppercase tracking-wider mb-0.5">Based in</p>
                            <p class="text-brand-dark font-medium text-lg">Dhaka, Bangladesh</p>
                        </div>
                    </a>
                </div>

                <!-- Social Minimal -->
                <div class="mt-12 flex gap-4">
                    <a href="#" class="w-10 h-10 rounded-full bg-transparent border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all">
                        <i data-lucide="linkedin" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-transparent border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all">
                        <i data-lucide="github" class="w-4 h-4"></i>
                    </a>
                    <a href="#" class="w-10 h-10 rounded-full bg-transparent border border-brand-border flex items-center justify-center text-brand-muted hover:text-brand-accent hover:border-brand-accent transition-all">
                        <i data-lucide="twitter" class="w-4 h-4"></i>
                    </a>
                </div>
            </div>

            <!-- Right Side: The Creative Form -->
            <div class="lg:col-span-7">
                <div class="bg-white rounded-[2rem] p-8 md:p-10 shadow-soft border border-white/50 relative overflow-hidden group">
                    
                    <!-- Form Decorative Accent Line -->
                    <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-300 to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <form action="#" class="space-y-6 relative z-10">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-sm font-semibold text-slate-700 ml-1">Name</label>
                                <input type="text" placeholder="Your name" class="modern-input w-full h-14 px-5 rounded-xl text-brand-dark font-medium">
                            </div>
                            <div class="space-y-2">
                                <label class="text-sm font-semibold text-slate-700 ml-1">Company</label>
                                <input type="text" placeholder="Company Ltd" class="modern-input w-full h-14 px-5 rounded-xl text-brand-dark font-medium">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-slate-700 ml-1">Email</label>
                            <div class="relative">
                                <input type="email" placeholder="you@company.com" class="modern-input w-full h-14 px-5 rounded-xl text-brand-dark font-medium">
                                <i data-lucide="at-sign" class="absolute right-5 top-4.5 w-5 h-5 text-slate-400"></i>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-slate-700 ml-1">Project Type</label>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                                <!-- Custom Radio Buttons using Labels -->
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="type" class="peer sr-only">
                                    <div class="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:bg-white hover:border-brand-accent/50 peer-checked:bg-brand-accent-soft peer-checked:text-brand-accent peer-checked:border-brand-accent transition-all">
                                        Automation
                                    </div>
                                </label>
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="type" class="peer sr-only">
                                    <div class="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:bg-white hover:border-brand-accent/50 peer-checked:bg-brand-accent-soft peer-checked:text-brand-accent peer-checked:border-brand-accent transition-all">
                                        Admin
                                    </div>
                                </label>
                                <label class="cursor-pointer relative">
                                    <input type="radio" name="type" class="peer sr-only">
                                    <div class="h-12 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-sm font-medium hover:bg-white hover:border-brand-accent/50 peer-checked:bg-brand-accent-soft peer-checked:text-brand-accent peer-checked:border-brand-accent transition-all">
                                        Other
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-semibold text-slate-700 ml-1">Message</label>
                            <textarea rows="4" placeholder="How can I help you?" class="modern-input w-full p-5 rounded-xl text-brand-dark font-medium resize-none"></textarea>
                        </div>

                        <div class="pt-2">
                            <button type="button" class="group/btn relative w-full h-14 rounded-xl bg-brand-dark text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-brand-accent/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex items-center justify-center gap-3">
                                <span class="absolute inset-0 bg-brand-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                                <span class="relative z-10 flex items-center gap-2">
                                    Send Message 
                                    <i data-lucide="send" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"></i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </section>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>