declare module '*.module.css' {
    const content: {[key: string]: string };
    export = content;
}

// src/global.d.ts
declare module '*.png';
