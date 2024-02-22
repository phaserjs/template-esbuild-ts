import { build } from 'esbuild';
import clean from 'esbuild-plugin-clean';
import copy from 'esbuild-plugin-copy';
import inlineImage from 'esbuild-plugin-inline-image';

let msgPhaser = {
    name: 'msg-phaser',
    setup(build) {
        build.onEnd(() => {
            const line = "---------------------------------------------------------";
            const msg = `❤️❤️❤️ Tell us about your game! - games@phaser.io ❤️❤️❤️`;
            process.stdout.write(`${line}\n${msg}\n${line}\n`);

            process.stdout.write(`✨ Done ✨\n`);
        });
    },
}

const builder = async () => {
    await build({
        entryPoints: ['./src/main.ts'],
        bundle: true,
        minify: true,
        sourcemap: false,
        target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
        outfile: './dist/bundle.min.js',
        plugins: [
            clean({
                patterns: ['./dist/*', './public/bundle.min.js'],
            }),
            inlineImage({
                namespace: 'assets',
            }),
            copy({
                assets: [
                    { from: './public/index.html', to: './' },
                    { from: './public/style.css', to: './' },
                    { from: './public/favicon.ico', to: './' },
                    { from: './public/favicon.png', to: './' },
                    { from: './public/assets/**/*', to: './assets/' }
                ],
            }),
            msgPhaser
        ]
    });
};
builder();
