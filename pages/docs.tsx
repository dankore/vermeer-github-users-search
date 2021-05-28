import Layout from '@components/Layout';
import React from 'react';

export default function Docs(): JSX.Element {
    return (
        <Layout title="Docs">
            <div className="max-w-4xl mx-auto p-4">
                <h1>Vermeer Github Users Search</h1>
                <hr />
                <h2>Working solution</h2>
                <p>3 hours</p>
                <hr />
                <h2>Live URL</h2>
                <p>
                    You can view the project live at:{' '}
                    <a href="https://vermeer-github-users-search.dankore.com">
                        Vermeer Github Users Search
                    </a>
                    .
                </p>
                <hr />
                <h2>Tech Stacks</h2>
                <ul>
                    <li>⚡ Next.js — A fast modern React Framework</li>
                    <li>🔗 TypeScript — Typed for safety</li>
                    <li>💎 Docker — Containerized for scalability</li>
                    <li>🌥 Deployed to Caprover - Hosted on my own server</li>
                    <li>🔥 next-seo — For managing SEO</li>
                    <li>💡 TailwindCSS — For styling</li>
                    <li>📏 ESLint — Pluggable JavaScript linter</li>
                    <li>💖 Prettier — Opinionated Code Formatter</li>
                    <li>🐶 Husky — Use git hooks with ease</li>
                    <li>🚫 lint-staged — Run linters against staged git files</li>
                    <li>🗂 Absolute import — Import folders and files using the @ prefix</li>
                </ul>
                <hr />
                <h2>Prerequisite software</h2>
                <ul>
                    <li>Visual Studio Code or any other IDE</li>
                    <li>
                        <a href="https://nodejs.org/en/download/">Node.js (8.x or above)</a>
                    </li>
                </ul>
                <h2>Run this app on your computer</h2>
                <ul>
                    <li>
                        <p>Clone this repo into a folder of your choice on your computer.</p>
                    </li>
                    <li>
                        <p>
                            Open the cloned repo in the IDE of your choice. I used Visual Studio
                            Code.
                        </p>
                    </li>
                    <li>
                        <p>
                            Open the integrated terminal in VSCode (<code>ctrl + ~</code> or View
                            -&gt; Terminal).
                        </p>
                    </li>
                    <li>
                        <p>
                            Type <code>yarn</code> in the terminal to install the packages required
                            for this project.
                        </p>
                    </li>
                    <li>
                        <p>
                            Type <code>yarn dev</code> to start the development server.
                        </p>
                    </li>
                    <li>
                        <p>
                            View the live app in modern browsers at{' '}
                            <a href="http://localhost:3000">http://localhost:3000</a>.
                        </p>
                    </li>
                </ul>
            </div>
        </Layout>
    );
}
