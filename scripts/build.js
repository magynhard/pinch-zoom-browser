
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;
const UglifyJS = require("uglify-js");

const project_root_dir = path.normalize(__dirname + '/..');
const project_dist_dir = project_root_dir + '/dist';

function writeFile(file, string) {
    fs.writeFileSync(file, string);
}

function readFile(file) {
    return fs.readFileSync(file,'utf8');
}

const current_date = new Date();
const comment_header = `/**

    pinch-zoom-browser
    
    @author     Matthäus J. N. Beyrle
    @copyright  2021 Matthäus J. N. Beyrle
    @license    MIT
    @github     https://github.com/magynhard/pinch-zoom-browser
    
    @forked     https://github.com/manuelstofer/pinchzoom
    
    build: ${current_date}
*/
`;
const src_file = readFile(path.normalize(project_root_dir + '/src/pinch-zoom-browser.js'));

if (!fs.existsSync(project_dist_dir)){
    fs.mkdirSync(project_dist_dir, { recursive: true });
}

writeFile(project_dist_dir + '/pinch-zoom-browser.js', comment_header + src_file);
const minified = UglifyJS.minify({ "file.js": src_file }).code;
writeFile(project_dist_dir + '/pinch-zoom-browser.min.js', comment_header + minified);