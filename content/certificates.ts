export type CertificatePlatform = 'Coursera' | 'LinkedIn Learning' | 'Google' | 'Microsoft' | 'Meta' | 'AWS' | 'Udemy' | 'edX' | 'DataCamp' | 'Other';
export type CertificateCategory = 'Technical' | 'Business' | 'Design' | 'Data' | 'Leadership';

export type CertificateType = 'professional' | 'specialization' | 'course';

export interface Certificate {
    id: string;
    name: string;
    issuer: string;
    platform: CertificatePlatform;
    category: CertificateCategory;
    certType: CertificateType; // 'professional' | 'specialization' | 'course'
    completionDate: string; // YYYY-MM format
    credentialId?: string;
    credentialUrl?: string;
    skills: string[];
    hours?: number;
    courses?: number; // Number of courses in a specialization/professional certificate
    description: string;

    // Enhanced fields for better storytelling
    whatILearned: string[]; // 3-5 key learning points
    keyTakeaways?: string; // Brief narrative summary
    certificateImage?: string; // Path to certificate preview image
    platformLogo: string; // Path to platform logo
}

export const CERTIFICATES: Certificate[] = [
    {
        id: 'datacamp-data-analyst-associate',
        name: 'Data Analyst Associate',
        issuer: 'DataCamp',
        platform: 'DataCamp',
        category: 'Data',
        certType: 'professional',
        completionDate: '2026-02',
        credentialId: 'DAA0012892055768',
        credentialUrl: 'https://www.datacamp.com/certificate/DAA0012892055768',
        skills: ['PostgreSQL', 'Data Cleaning', 'Data Validation', 'Statistical Concepts', 'Data Visualization', 'Hypothesis Testing'],
        platformLogo: '/images/certificates/Data Camp Logo.webp',
        description: 'Entry-level data analysis certification covering data management, exploratory analysis, statistical experimentation, and stakeholder communication.',
        whatILearned: [
            'Use PostgreSQL to extract, join, aggregate, validate, and clean data',
            'Apply statistical concepts for hypothesis testing and experimentation',
            'Calculate metrics and create data visualizations to report data characteristics',
            'Present data findings clearly to small and diverse audiences'
        ],
        keyTakeaways: 'Earned an industry-recognized DataCamp certification by demonstrating end-to-end data analyst skills — from raw data extraction in PostgreSQL to communicating insights to stakeholders.'
    },
    {
        id: 'datacamp-data-scientist-associate',
        name: 'Data Scientist Associate',
        issuer: 'DataCamp',
        platform: 'DataCamp',
        category: 'Data',
        certType: 'professional',
        completionDate: '2026-02',
        credentialId: 'DSA0016086648677',
        credentialUrl: 'https://www.datacamp.com/certificate/DSA0016086648677',
        skills: ['Python', 'Data Management', 'Statistical Testing', 'Supervised Learning', 'Unsupervised Learning', 'Data Visualization'],
        platformLogo: '/images/certificates/Data Camp Logo.webp',
        description: 'Foundational data science certification covering data management, statistical experimentation, supervised and unsupervised learning, and Python programming.',
        whatILearned: [
            'Import, manipulate, and validate data using Python',
            'Apply sampling methods and carry out rigorous statistical tests',
            'Calculate and report data characteristics and create appropriate visualizations',
            'Implement supervised and unsupervised learning approaches for real-world problems'
        ],
        keyTakeaways: 'Validated foundational data science competency through timed exams and a practical exam — demonstrating the ability to clean data, perform statistical analysis, and build ML models.'
    },
    {
        id: 'datacamp-data-engineer-associate',
        name: 'Data Engineer Associate',
        issuer: 'DataCamp',
        platform: 'DataCamp',
        category: 'Data',
        certType: 'professional',
        completionDate: '2026-02',
        credentialId: 'DEA0017646228366',
        credentialUrl: 'https://www.datacamp.com/certificate/DEA0017646228366',
        skills: ['PostgreSQL', 'Database Design', 'Data Validation', 'Data Cleaning', 'Cloud Tools', 'Schema Design'],
        platformLogo: '/images/certificates/Data Camp Logo.webp',
        description: 'Entry-level data engineering certification covering schema design, PostgreSQL data manipulation, cloud tools, and data validation.',
        whatILearned: [
            'Use PostgreSQL to manipulate, validate, and clean data effectively',
            'Explain database schema design concepts and how tables interconnect',
            'Create, read, and analyze data visualizations for reporting',
            'Apply foundational data engineering principles for pipeline construction'
        ],
        keyTakeaways: 'Demonstrated data engineering fundamentals — from relational database design to data cleaning pipelines — through rigorous timed and practical exams.'
    },
    {
        id: 'datacamp-ai-engineer-data-scientists-associate',
        name: 'AI Engineer for Data Scientists Associate',
        issuer: 'DataCamp',
        platform: 'DataCamp',
        category: 'Data',
        certType: 'professional',
        completionDate: '2026-02',
        credentialId: 'AEDS0018117957021',
        credentialUrl: 'https://www.datacamp.com/certificate/AEDS0018117957021',
        skills: ['Python', 'MLOps', 'LLMOps', 'Generative AI', 'ETL/ELT Pipelines', 'AI Governance', 'Model Development'],
        platformLogo: '/images/certificates/Data Camp Logo.webp',
        description: 'AI engineering certification for data scientists covering model development, AI governance, MLOps/LLMOps awareness, and generative AI application prototyping.',
        whatILearned: [
            'Prepare data for modeling and implement supervised/unsupervised ML approaches using Python',
            'Calculate metrics and create visualizations to communicate data and model characteristics',
            'Demonstrate awareness of core MLOps and LLMOps concepts for production systems',
            'Create prototype systems and applications that utilize generative AI'
        ],
        keyTakeaways: 'Bridged the gap between data science and AI engineering — validating skills in production-ready model development, AI governance, and generative AI application prototyping.'
    },
    {
        id: 'datacamp-ai-engineer-developers-associate',
        name: 'AI Engineer for Developers Associate',
        issuer: 'DataCamp',
        platform: 'DataCamp',
        category: 'Technical',
        certType: 'professional',
        completionDate: '2026-02',
        credentialId: 'AIEDA0017312065110',
        credentialUrl: 'https://www.datacamp.com/certificate/AIEDA0017312065110',
        skills: ['Python', 'LLMs', 'Prompt Engineering', 'AI Governance', 'Chatbot Development', 'Software Engineering Principles'],
        platformLogo: '/images/certificates/Data Camp Logo.webp',
        description: 'Developer-focused AI engineering certification covering core AI theory, LLM concepts, prompt engineering, AI safety, and building chatbots and AI systems in Python.',
        whatILearned: [
            'Understand and apply core AI and LLM concepts including prompt engineering',
            'Describe best practices for mitigating privacy, safety, and governance risks in AI',
            'Build simple chatbots and implement more complex AI-powered systems',
            'Apply common software engineering principles and conventions using Python'
        ],
        keyTakeaways: 'Validated developer-focused AI engineering skills — from LLM fundamentals and responsible AI practices to building and deploying AI-powered applications.'
    },
    {
        id: 'excel-skills-business',
        name: 'Excel Skills for Business Specialization',
        issuer: 'Macquarie University',
        platform: 'Coursera',
        category: 'Business',
        certType: 'specialization',
        completionDate: '2020-07',
        credentialId: 'V06JPIO8XTJS',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/V06JPIO8XTJS',
        skills: ['Excel Essentials', 'Formulas & Functions', 'Data Manipulation', 'Advanced Excel', 'Dashboards'],
        hours: 120,
        courses: 4,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Fundamental to advanced proficiency in Microsoft Excel for professional business environments, covering formulas, data tools, and automation.',
        whatILearned: [
            'Master Excel formulas, functions, and advanced data manipulation techniques',
            'Build professional dashboards and automate repetitive business workflows',
            'Analyze and visualize business data using PivotTables and charts',
            'Apply Excel best practices to real-world business scenarios'
        ],
        keyTakeaways: 'Developed end-to-end Excel proficiency — from basic formulas to advanced automation — enabling faster, more accurate business reporting.'
    },
    {
        id: 'english-communication-skills',
        name: 'Improve Your English Communication Skills Specialization',
        issuer: 'Georgia Institute of Technology',
        platform: 'Coursera',
        category: 'Leadership',
        certType: 'specialization',
        completionDate: '2020-07',
        credentialId: '7C97KDZ3LUNV',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/7C97KDZ3LUNV',
        skills: ['Business Writing', 'Public Speaking', 'Professional Networking', 'Grammar', 'Presentations'],
        hours: 40,
        courses: 4,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Focused on writing professional emails, delivering effective presentations, and building a professional ePortfolio for career advancement.',
        whatILearned: [
            'Write clear, concise professional emails and business documents',
            'Deliver confident presentations and speak effectively in meetings',
            'Build and maintain a professional network and ePortfolio',
            'Apply grammar and style best practices in workplace communication'
        ],
        keyTakeaways: 'Sharpened professional communication skills that directly improve stakeholder relationships and executive-level reporting.'
    },
    {
        id: 'career-success',
        name: 'Career Success Specialization',
        issuer: 'University of California, Irvine',
        platform: 'Coursera',
        category: 'Leadership',
        certType: 'specialization',
        completionDate: '2020-07',
        credentialId: '5R22Q3MEQ4ZA',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/5R22Q3MEQ4ZA',
        skills: ['Project Management', 'Time Management', 'Negotiation', 'Business Communication', 'Decision-Making'],
        hours: 80,
        courses: 10,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Developed essential professional skills for the modern workforce, including finance fundamentals, communication techniques, and strategic problem-solving.',
        whatILearned: [
            'Apply time management and productivity frameworks in professional settings',
            'Negotiate effectively and communicate with clarity across teams',
            'Make structured decisions using proven problem-solving models',
            'Understand core finance concepts for business decision-making'
        ],
        keyTakeaways: 'Built a comprehensive professional toolkit — from negotiation to finance — that accelerates career growth and leadership effectiveness.'
    },
    {
        id: 'understanding-modern-finance',
        name: 'Understanding Modern Finance Specialization',
        issuer: 'Moscow Institute of Physics and Technology',
        platform: 'Coursera',
        category: 'Business',
        certType: 'specialization',
        completionDate: '2020-07',
        credentialId: 'LERWQL6RC5CG',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/LERWQL6RC5CG',
        skills: ['Financial Accounting', 'Corporate Finance', 'Business Valuation', 'Capital Budgeting', 'M&A'],
        courses: 5,
        hours: 80,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Deep dive into financial analysis, corporate valuation, and project finance within the modern financial landscape including M&A strategy.',
        whatILearned: [
            'Analyze financial statements and assess corporate financial health',
            'Apply capital budgeting techniques to evaluate investment decisions',
            'Value businesses using DCF and comparable company analysis',
            'Understand mergers, acquisitions, and project finance structures'
        ],
        keyTakeaways: 'Gained a rigorous foundation in corporate finance that enables data-driven investment and strategic business decisions.'
    },
    {
        id: 'google-it-support',
        name: 'Google IT Support Professional Certificate',
        issuer: 'Google',
        platform: 'Google',
        category: 'Technical',
        certType: 'professional',
        completionDate: '2023-02',
        credentialId: '7ZA7C8J3JGKZ',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/7ZA7C8J3JGKZ',
        skills: ['Technical Support', 'Computer Networking', 'Operating Systems', 'System Administration', 'IT Security'],
        hours: 120,
        courses: 5,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Hands-on program designed to prepare learners for IT support roles through OS management, networking, and security defense strategies.',
        whatILearned: [
            'Troubleshoot hardware, software, and network issues systematically',
            'Manage operating systems including Linux and Windows environments',
            'Configure and secure computer networks and system infrastructure',
            'Apply IT security fundamentals to protect organizational assets'
        ],
        keyTakeaways: 'Built a solid IT foundation covering the full support lifecycle — from hardware to security — enabling confident infrastructure management.'
    },
    {
        id: 'google-data-analytics',
        name: 'Google Data Analytics Professional Certificate',
        issuer: 'Google',
        platform: 'Google',
        category: 'Data',
        certType: 'professional',
        completionDate: '2021-04',
        credentialId: '0SK8KSAE0W8W',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/0SK8KSAE0W8W',
        skills: ['Data Analytics', 'Data Cleaning', 'Data Visualization', 'R', 'Tableau'],
        hours: 240,
        courses: 8,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Comprehensive professional program covering the full data analytics lifecycle — from asking the right questions to sharing insights through visualization.',
        whatILearned: [
            'Clean, transform, and prepare raw datasets for analysis',
            'Perform exploratory data analysis using R and SQL',
            'Create compelling visualizations and dashboards in Tableau',
            'Communicate data-driven insights to non-technical stakeholders'
        ],
        keyTakeaways: 'Mastered the end-to-end data analytics process. Can independently take a business question from raw data to a clear, actionable insight.'
    },
    {
        id: 'excel-data-analytics-visualization',
        name: 'Excel Skills for Data Analytics and Visualization Specialization',
        issuer: 'Macquarie University',
        platform: 'Coursera',
        category: 'Data',
        certType: 'specialization',
        completionDate: '2023-04',
        credentialId: 'UFJGTAV6KJ00',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/UFJGTAV6KJ00',
        skills: ['Power Query', 'Power Pivot', 'Data Visualization', 'Dashboarding', 'Data Cleansing'],
        hours: 40,
        courses: 3,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Advanced Excel techniques using Power Query and Power Pivot for professional data storytelling, interactive dashboards, and large-scale data analysis.',
        whatILearned: [
            'Build automated data pipelines using Power Query for ETL workflows',
            'Model and analyze large datasets with Power Pivot and DAX',
            'Design interactive dashboards with slicers and dynamic charts',
            'Clean and transform messy data into analysis-ready formats'
        ],
        keyTakeaways: 'Elevated Excel from a spreadsheet tool to a full analytics platform — enabling enterprise-grade data modeling without code.'
    },
    {
        id: 'google-cloud-data-analytics',
        name: 'Google Cloud Data Analytics Professional Certificate',
        issuer: 'Google Cloud',
        platform: 'Other',
        category: 'Data',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: 'JP6FGON1WY11',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/JP6FGON1WY11',
        skills: ['Google Cloud', 'BigQuery', 'Data Transformation', 'Cloud Analytics', 'Data Visualization'],
        hours: 80,
        courses: 5,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Specialized training in leveraging Google Cloud tools for cloud-native data management, storage, transformation, and analytics at scale.',
        whatILearned: [
            'Query and analyze large datasets using BigQuery on Google Cloud',
            'Build cloud-native data pipelines for transformation and storage',
            'Visualize cloud data insights using Looker and Data Studio',
            'Apply Google Cloud best practices for scalable analytics architecture'
        ],
        keyTakeaways: 'Gained hands-on cloud analytics skills — from raw data ingestion to executive-ready dashboards — entirely within the Google Cloud ecosystem.'
    },
    {
        id: 'ibm-data-analytics-excel-r',
        name: 'IBM Data Analytics with Excel and R Professional Certificate',
        issuer: 'IBM',
        platform: 'Coursera',
        category: 'Data',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: '95W2OQX2L9XK',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/95W2OQX2L9XK',
        skills: ['R Programming', 'SQL', 'Excel Pivot Tables', 'Data Visualization', 'Statistical Analysis'],
        hours: 120,
        courses: 9,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Comprehensive certificate covering data preparation in Excel and advanced statistical analysis and visualization using R programming.',
        whatILearned: [
            'Perform statistical analysis and hypothesis testing using R',
            'Build advanced visualizations with ggplot2 and R Shiny',
            'Prepare and analyze data using Excel PivotTables and Power Query',
            'Write SQL queries to extract and manipulate relational data'
        ],
        keyTakeaways: 'Combined the accessibility of Excel with the power of R — enabling rigorous statistical analysis alongside intuitive business reporting.'
    },
    {
        id: 'ibm-data-management',
        name: 'IBM Data Management Professional Certificate',
        issuer: 'IBM',
        platform: 'Coursera',
        category: 'Data',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: 'Y2JRRB6YRCMS',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/Y2JRRB6YRCMS',
        skills: ['Data Engineering', 'SQL', 'Data Warehouse', 'Data Governance', 'Tableau'],
        hours: 120,
        courses: 12,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Specialized program covering the full lifecycle of data management — from engineering foundations to governance, security, and risk compliance.',
        whatILearned: [
            'Design and manage relational databases and data warehouse architectures',
            'Implement data governance, privacy, and compliance frameworks',
            'Integrate and migrate data across systems using ETL best practices',
            'Visualize and report on data assets using Tableau'
        ],
        keyTakeaways: 'Developed enterprise-grade data management skills — ensuring data is accurate, secure, governed, and ready for business intelligence.'
    },
    {
        id: 'ibm-data-analyst',
        name: 'IBM Data Analyst Professional Certificate',
        issuer: 'IBM',
        platform: 'Coursera',
        category: 'Data',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: 'VYOV21JCZ46S',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/VYOV21JCZ46S',
        skills: ['Python', 'SQL', 'IBM Cognos', 'Tableau', 'Generative AI for Data'],
        hours: 160,
        courses: 11,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Mastery of practical tools used by professional data analysts, including advanced dashboarding and the application of Generative AI in data careers.',
        whatILearned: [
            'Analyze data using Python, Pandas, and NumPy for real-world problems',
            'Build professional dashboards in IBM Cognos Analytics and Tableau',
            'Apply Generative AI tools to accelerate data analysis workflows',
            'Present data-driven findings through compelling visual storytelling'
        ],
        keyTakeaways: 'Completed IBM\'s flagship data analyst program — gaining mastery across the full analytics stack from Python to AI-augmented reporting.'
    },
    {
        id: 'meta-data-analyst',
        name: 'Meta Data Analyst Professional Certificate',
        issuer: 'Meta',
        platform: 'Meta',
        category: 'Data',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: 'Y3P9J8RKCPMN',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/Y3P9J8RKCPMN',
        skills: ['Python', 'SQL', 'Statistics', 'OSEMN Framework', 'Data Visualization'],
        hours: 200,
        courses: 5,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Professional training in collecting and cleaning data using the OSEMN framework, Python-based analysis, and statistical modeling for business insights.',
        whatILearned: [
            'Apply the OSEMN framework to structure end-to-end data projects',
            'Perform statistical analysis and A/B testing for business decisions',
            'Write advanced SQL queries and Python scripts for data extraction',
            'Communicate findings through data visualizations and executive reports'
        ],
        keyTakeaways: 'Learned data analytics the way Meta does it — structured, statistical, and always tied to measurable business outcomes.'
    },
    {
        id: 'microsoft-it-support',
        name: 'Microsoft IT Support Specialist Professional Certificate',
        issuer: 'Microsoft',
        platform: 'Microsoft',
        category: 'Technical',
        certType: 'professional',
        completionDate: '2025-03',
        credentialId: '3CGL0SDXGIMJ',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/professional-cert/3CGL0SDXGIMJ',
        skills: ['Microsoft 365', 'Cybersecurity', 'Networking', 'Troubleshooting', 'System Administration'],
        hours: 120,
        courses: 6,
        platformLogo: '/images/platforms/microsoft.svg',
        description: 'Comprehensive training in IT support within the Microsoft ecosystem, covering diagnostics, secure networking, and Microsoft 365 administration.',
        whatILearned: [
            'Administer and troubleshoot Microsoft 365 environments at scale',
            'Configure and secure enterprise networks following Microsoft best practices',
            'Diagnose and resolve hardware, software, and connectivity issues',
            'Implement cybersecurity controls and data backup strategies'
        ],
        keyTakeaways: 'Validated Microsoft-specific IT skills — from M365 administration to secure networking — essential for modern enterprise environments.'
    },
    {
        id: 'excel-business-forecasting',
        name: 'Excel Skills for Business Forecasting Specialization',
        issuer: 'Macquarie University',
        platform: 'Coursera',
        category: 'Business',
        certType: 'specialization',
        completionDate: '2025-03',
        credentialId: 'SKMEH6MIW4QV',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/SKMEH6MIW4QV',
        skills: ['Time Series Analysis', 'Regression Models', 'Forecasting', 'Process Optimization', 'Model Evaluation'],
        hours: 40,
        courses: 3,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Advanced techniques for building regression and time series forecasting models in Excel for data-driven business planning and decision-making.',
        whatILearned: [
            'Build regression models to identify trends and forecast business outcomes',
            'Apply time series analysis for demand planning and financial projections',
            'Evaluate and validate forecasting models for accuracy and reliability',
            'Optimize business processes using quantitative forecasting methods'
        ],
        keyTakeaways: 'Transformed Excel into a forecasting powerhouse — enabling precise, model-driven business planning without specialized software.'
    },
    {
        id: 'udemy-photoshop-beginner-pro',
        name: 'Ultimate Adobe Photoshop Training: From Beginner to Pro 2022',
        issuer: 'Cristian Doru Barin',
        platform: 'Udemy',
        category: 'Design',
        certType: 'specialization',
        completionDate: '2022-03',
        credentialId: 'UC-5294979e-6073-4e9e-9d84-aeb9b1e98a22',
        credentialUrl: 'https://ude.my/UC-5294979e-6073-4e9e-9d84-aeb9b1e98a22',
        skills: ['Adobe Photoshop', 'Photo Editing', 'Digital Design', 'Layer Masking', 'Compositing'],
        hours: 15.5,
        platformLogo: '/images/certificates/Udemy Logo Logo.webp',
        description: 'Comprehensive Photoshop training from beginner to professional level — covering photo retouching, compositing, digital painting, and advanced layer techniques.',
        whatILearned: [
            'Master Photoshop tools, layers, masks, and blending modes',
            'Retouch and enhance photos with professional-grade techniques',
            'Create digital composites and advanced visual effects',
            'Design graphics for web, print, and social media'
        ],
        keyTakeaways: 'Gained full Photoshop proficiency — from basic edits to advanced compositing — enabling professional-quality visual content creation for any medium.'
    },
    {
        id: 'machine-learning-python',
        name: 'Machine Learning with Python',
        issuer: 'IBM',
        platform: 'Coursera',
        category: 'Data',
        certType: 'course',
        completionDate: '2025-03',
        credentialId: '4ZQUL1KMK6IG',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/4ZQUL1KMK6IG',
        skills: ['Machine Learning', 'Python', 'Scikit-learn', 'Regression', 'Classification', 'Clustering'],
        hours: 20,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Hands-on introduction to machine learning using Python and Scikit-learn, covering supervised and unsupervised algorithms applied to real-world datasets.',
        whatILearned: [
            'Build and evaluate supervised models including regression and classification',
            'Apply unsupervised techniques such as K-Means clustering and DBSCAN',
            'Use Scikit-learn pipelines for reproducible ML workflows',
            'Assess model performance using cross-validation and evaluation metrics'
        ],
        keyTakeaways: 'Gained practical ML skills in Python — from data preparation to model evaluation — enabling data-driven predictions on real business problems.'
    },
    {
        id: 'agile-atlassian-jira',
        name: 'Agile with Atlassian Jira',
        issuer: 'Atlassian',
        platform: 'Coursera',
        category: 'Business',
        certType: 'course',
        completionDate: '2020-07',
        credentialId: '4VHGH9JEHTP6',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/4VHGH9JEHTP6',
        skills: ['Agile', 'Scrum', 'Kanban', 'Jira', 'Sprint Planning', 'Backlog Management'],
        hours: 8,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Practical training in Agile methodologies using Atlassian Jira — covering Scrum, Kanban, sprint planning, and backlog management for modern software teams.',
        whatILearned: [
            'Configure and manage Jira projects using Scrum and Kanban boards',
            'Plan and execute sprints with backlog grooming and velocity tracking',
            'Apply Agile ceremonies: standups, retrospectives, and sprint reviews',
            'Use Jira reporting tools to track team progress and delivery metrics'
        ],
        keyTakeaways: 'Mastered Agile project execution in Jira — enabling efficient sprint delivery, transparent team coordination, and data-driven iteration planning.'
    },
    {
        id: 'version-control-git',
        name: 'Version Control with Git',
        issuer: 'Atlassian',
        platform: 'Coursera',
        category: 'Technical',
        certType: 'course',
        completionDate: '2020-07',
        credentialId: 'ZDAK2KZXMU9T',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/ZDAK2KZXMU9T',
        skills: ['Git', 'Version Control', 'Branching', 'Merging', 'Pull Requests', 'CI/CD Workflows'],
        hours: 8,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Comprehensive Git training covering branching strategies, merge conflict resolution, and collaborative workflows used in professional software development teams.',
        whatILearned: [
            'Manage code history using Git commits, branches, and tags',
            'Resolve merge conflicts and apply rebase strategies effectively',
            'Collaborate using pull requests, code reviews, and remote repositories',
            'Implement Git workflows like Gitflow for team-based development'
        ],
        keyTakeaways: 'Built confident Git proficiency — from solo version control to team collaboration workflows — a foundational skill for any technical role.'
    },
    {
        id: 'ai-for-everyone',
        name: 'AI For Everyone',
        issuer: 'DeepLearning.AI',
        platform: 'Coursera',
        category: 'Technical',
        certType: 'course',
        completionDate: '2020-07',
        credentialId: 'X97DKP2TR86X',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/X97DKP2TR86X',
        skills: ['Artificial Intelligence', 'AI Strategy', 'Machine Learning Concepts', 'AI Ethics', 'Digital Transformation'],
        hours: 6,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Andrew Ng\'s non-technical AI literacy course covering how AI works, how to build AI projects, and how to navigate AI strategy within an organization.',
        whatILearned: [
            'Understand what AI and machine learning can and cannot do realistically',
            'Identify high-value AI use cases and evaluate project feasibility',
            'Navigate AI strategy, ethics, and organizational transformation',
            'Communicate effectively with AI teams and technical stakeholders'
        ],
        keyTakeaways: 'Developed executive-level AI literacy — enabling strategic AI adoption decisions and effective collaboration with data science teams.'
    },
    {
        id: 'html-css-javascript-web',
        name: 'HTML, CSS, and Javascript for Web Developers',
        issuer: 'Johns Hopkins University',
        platform: 'Coursera',
        category: 'Technical',
        certType: 'course',
        completionDate: '2020-07',
        credentialId: '7FEUTY9XMYE4',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/7FEUTY9XMYE4',
        skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Bootstrap', 'DOM Manipulation'],
        hours: 40,
        platformLogo: '/images/platforms/coursera.svg',
        description: 'Full front-end web development foundation from Johns Hopkins — covering semantic HTML, responsive CSS layouts, and interactive JavaScript for modern web applications.',
        whatILearned: [
            'Build semantic, accessible HTML5 page structures and layouts',
            'Style responsive interfaces using CSS3, Flexbox, and Bootstrap',
            'Add interactivity with JavaScript, DOM manipulation, and event handling',
            'Apply web development best practices for performance and accessibility'
        ],
        keyTakeaways: 'Established a solid front-end foundation — enabling the design and build of responsive, interactive web experiences from scratch.'
    },
    {
        id: 'introduction-to-linux',
        name: 'Introduction to Linux',
        issuer: 'The Linux Foundation',
        platform: 'edX',
        category: 'Technical',
        certType: 'course',
        completionDate: '2021-01',
        credentialId: '07801979521e4ceeb602b231f616ff92',
        credentialUrl: 'https://courses.edx.org/certificates/07801979521e4ceeb602b231f616ff92',
        skills: ['Linux', 'Command Line', 'Shell Scripting', 'File System', 'System Administration'],
        hours: 21,
        platformLogo: '/images/platforms/edx.svg',
        description: 'Comprehensive introduction to Linux from The Linux Foundation — covering the command line, file system, shell scripting, and system administration fundamentals.',
        whatILearned: [
            'Navigate and manage the Linux file system using the command line',
            'Write shell scripts to automate repetitive system tasks',
            'Manage users, permissions, and processes in Linux environments',
            'Understand Linux distributions and system administration basics'
        ],
        keyTakeaways: 'Built a solid Linux foundation — enabling confident command-line operation and system administration in professional server environments.'
    },
    {
        id: 'python-basics-data-science',
        name: 'Python Basics for Data Science',
        issuer: 'IBM',
        platform: 'edX',
        category: 'Data',
        certType: 'course',
        completionDate: '2021-01',
        credentialId: '11c7f14dfa8d4f658f4f1e8ce87f3399',
        credentialUrl: 'https://courses.edx.org/certificates/11c7f14dfa8d4f658f4f1e8ce87f3399',
        skills: ['Python', 'Pandas', 'NumPy', 'Data Wrangling', 'Jupyter Notebooks'],
        hours: 84,
        platformLogo: '/images/platforms/edx.svg',
        description: 'IBM-designed Python course covering the core programming fundamentals and data science libraries needed to begin working with real-world datasets.',
        whatILearned: [
            'Write Python programs using variables, loops, functions, and data structures',
            'Manipulate and analyze data using Pandas DataFrames',
            'Perform numerical computations with NumPy arrays',
            'Work with Jupyter Notebooks for interactive data exploration'
        ],
        keyTakeaways: 'Established Python as a core data tool — from basic syntax to Pandas-powered data wrangling — forming the foundation for all subsequent data science work.'
    }
];

// Platform metadata for styling and branding
export const PLATFORM_METADATA: Record<CertificatePlatform, {
    color: string;
    gradient: string;
    textColor: string;
}> = {
    'DataCamp': {
        color: '#03EF62',
        gradient: 'from-green-400 to-emerald-500',
        textColor: 'text-emerald-600'
    },
    'Coursera': {
        color: '#0056D2',
        gradient: 'from-blue-600 to-blue-700',
        textColor: 'text-blue-700'
    },
    'LinkedIn Learning': {
        color: '#0A66C2',
        gradient: 'from-blue-600 to-blue-800',
        textColor: 'text-blue-800'
    },
    'Google': {
        color: '#4285F4',
        gradient: 'from-blue-500 to-blue-600',
        textColor: 'text-blue-600'
    },
    'Microsoft': {
        color: '#00A4EF',
        gradient: 'from-cyan-500 to-blue-600',
        textColor: 'text-cyan-600'
    },
    'Meta': {
        color: '#0668E1',
        gradient: 'from-blue-600 to-indigo-700',
        textColor: 'text-blue-700'
    },
    'AWS': {
        color: '#FF9900',
        gradient: 'from-orange-500 to-orange-600',
        textColor: 'text-orange-600'
    },
    'Udemy': {
        color: '#A435F0',
        gradient: 'from-purple-600 to-purple-700',
        textColor: 'text-purple-700'
    },
    'edX': {
        color: '#02262B',
        gradient: 'from-slate-800 to-slate-900',
        textColor: 'text-slate-900'
    },
    'Other': {
        color: '#64748b',
        gradient: 'from-slate-600 to-slate-700',
        textColor: 'text-slate-700'
    }
};

// Category visual metadata with SVG icons
export const CATEGORY_METADATA: Record<CertificateCategory, {
    gradient: string;
    color: string;
    svg: string;
}> = {
    'Technical': {
        gradient: 'from-blue-50 to-blue-100',
        color: '#2563eb',
        svg: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    },
    'Business': {
        gradient: 'from-purple-50 to-purple-100',
        color: '#9333ea',
        svg: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    'Design': {
        gradient: 'from-pink-50 to-pink-100',
        color: '#ec4899',
        svg: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
    },
    'Data': {
        gradient: 'from-green-50 to-green-100',
        color: '#16a34a',
        svg: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
    },
    'Leadership': {
        gradient: 'from-orange-50 to-orange-100',
        color: '#ea580c',
        svg: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
    }
};
