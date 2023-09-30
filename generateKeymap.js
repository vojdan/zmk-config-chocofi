const input_layer_0 = `
|   |  Q  |  W  |  F  |  P  |  B  |    ---    |  J  |  L   |  U  |  Y  |  '  |   |
|   |  A  |  R  |  S  |  T  |  G  |    ---    |  M  |  N   |  E  |  I  |  O  |   |
|   |  Z  |  X  |  C  |  D  |  V  |    ---    |  K  |  H   |  ,  |  .  |  /  |   |
                | CMD | LWR | SPC |    ---    | ENT | RSE  | ALT |
`;
const input_layer_1 = `
|   | ESC |  7  |  8  |  9  |     |    ---    |     |     |      |    |  BKSP  |   |
|   | TAB |  4  |  5  |  6  |     |    ---    |     | LFT | DWN  | UP |  RGT   |   |
|   |  0  |  1  |  2  |  3  |     |    ---    |     |     |      |    |        |   |
                | GUI |     |     |    ---    | SHFT|     |      |
`;
const input_layer_2 = `
|  |  \`  |  ~  | "|" |     |     |    ---    |     |  &  |  *  |  (  |  )  |   |
|  | CTRL |  $  |  %  |  ^  |     |    ---    |  -  |  =  |  [  |  ]  |  \  |   |
|  | SHFT |  !  |  @  |  #  |     |    ---    |  _  |  +  |  {  |  }  |  ?  |   |
                | GUI |     | SPC |    ---    | ENT |     | ALT |
`;

const keyMap = {
  CMD: "&kp LGUI ",
  LWR: "&mo 1 ",
  SPC: "&kp SPACE ",
  ENT: "&kp RET ",
  RSE: "&mo 2 ",
  ALT: "&kp RALT ",
  "'": "&kp SQT ",
  ",": "&kp COMMA ",
  ".": "&kp DOT ",
  "/": "&kp FSLH ",
  TAB: "&kp TAB ",
  1: "&kp N1 ",
  2: "&kp N2 ",
  3: "&kp N3 ",
  4: "&kp N4 ",
  5: "&kp N5 ",
  6: "&kp N6 ",
  7: "&kp N7 ",
  8: "&kp N8 ",
  9: "&kp N9 ",
  0: "&kp N0 ",
  BKSP: "&kp BSPC ",
  BTCLR: "&bt BT_CLR ",
  BT1: "&bt BT_SEL 0 ",
  BT2: "&bt BT_SEL 1 ",
  BT3: "&bt BT_SEL 2 ",
  BT4: "&bt BT_SEL 3 ",
  BT5: "&bt BT_SEL 4 ",
  LFT: "&kp LEFT ",
  DWN: "&kp DOWN ",
  UP: "&kp UP ",
  RGT: "&kp RIGHT ",
  SHFT: "&kp LSHFT ",
  GUI: "&kp LGUI ",
  "": "&none ",
  "!": "&kp EXCL ",
  "@": "&kp AT ",
  "#": "&kp HASH ",
  $: "&kp DLLR ",
  "%": "&kp PRCNT ",
  "^": "&kp CARET ",
  "&": "&kp AMPS ",
  "*": "&kp KP_MULTIPLY ",
  "(": "&kp LPAR ",
  ")": "&kp RPAR ",
  CTRL: "&kp LCTRL ",
  "-": "&kp MINUS ",
  "=": "&kp EQUAL ",
  "[": "&kp LBKT ",
  "]": "&kp RBKT ",
  "\\": "&kp BSLH ",
  "`": "&kp GRAVE ",
  _: "&kp UNDER ",
  "+": "&kp PLUS ",
  "{": "&kp LBRC ",
  "}": "&kp RBRC ",
  _PIPE_: "&kp PIPE ",
  "~": "&kp TILDE ",
  "---": "",
};

function transformInput(layerName, input) {
  const lines = input.trim().split("\n");
  let output = `
${layerName} {
// ------------------------------------------------------------------------
`;

  // Add original input as comments
  lines.forEach((line) => {
    output += "// " + line + "\n";
  });

  output +=
    "// ------------------------------------------------------------------------\n\n";
  output += "bindings = <\n";

  // Transform input
  lines.forEach((line) => {
    output += "      ";
    const keys = line
      .replace('"|"', "_PIPE_")
      .split("|")
      .map((k) => k.trim())
      .filter((k) => k !== "---");
    // .filter((k) => k.length > 0);

    // remove 1st and last element
    keys.shift();
    keys.pop();

    keys.forEach((key) => {
      // console.log("\x1b[93m%s\x1b[0m", "KEY:", key);
      output += keyMap[key] || `&kp ${key}   `;
    });
    output += "     ";
    output += "\n";
  });

  output += `>;
};



`;

  return output;
}

const intro = `
/*
 * Copyright (c) 2020 The ZMK Contributors
 *
 * SPDX-License-Identifier: MIT
 */

#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/bt.h>
#include <dt-bindings/zmk/outputs.h>

/ {
        keymap {
                compatible = "zmk,keymap";


`;
const outro = `
};
};
`;

console.log(intro);
console.log(transformInput("default_layer", input_layer_0));
console.log(transformInput("lower_layer", input_layer_1));
console.log(transformInput("raise_layer", input_layer_2));
console.log(outro);
