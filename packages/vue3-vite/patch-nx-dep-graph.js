/*
Original source: https://github.com/ZachJW34/nx-plus/blob/d7fb3d9dc2da4a5605495223df3d749220527e4b/libs/vue/patch-nx-dep-graph.js

MIT License

Copyright (c) 2020 Zachary Williams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const fs = require('fs');
const path = require('path');

/**
 * Patch dep-graph builder function to support Vue files.
 * @see https://github.com/nrwl/nx/issues/2960
 */
function patchNxDepGraph() {
  const filePath = path.join(
    process.env.INIT_CWD || '',
    'node_modules/@nrwl/workspace/src/core/project-graph/build-dependencies/typescript-import-locator.js'
  );
  try {
    const fileContent = fs.readFileSync(filePath).toString('utf-8');
    const replacement = "extension !== '.ts' && extension !== '.vue'";
    if (fileContent.includes(replacement)) {
      return;
    }
    fs.writeFileSync(
      filePath,
      fileContent.replace("extension !== '.ts'", replacement)
    );
    console.log('Successfully patched Nx dep-graph for Vue support.');
  } catch (err) {
    console.error('Failed to patch Nx dep-graph for Vue support.', err);
  }
}

patchNxDepGraph();