const input_layer_0 = `
|  TAB |  Q  |  W  |  F  |  P  |  B  |         |  J  |  L   |  U  |  Y  |  '  |  TAB |
| CTRL |  A  |  R  |  S  |  T  |  G  |         |  M  |  N   |  E  |  I  |  O  | CTRL |
| SHFT |  Z  |  X  |  C  |  D  |  V  |         |  K  |  H   |  ,  |  .  |  /  | SHFT |
| CMD | LWR | SPC |               | ENT | RSE  | ALT |
`;
const input_layer_1 = `
|  TAB | ESC |  7  |  8  |  9  |    |          |     |     |      |    |  BKSP  |  TAB |
| CTRL | TAB |  4  |  5  |  6  |    |          |     | LFT | DWN  | UP |  RGT   | CTRL |
| SHFT |  0  |  1  |  2  |  3  |    |          |     |     |      |    |        | SHFT |
| GUI  |    |     |               | SHFT|  |  |
`;
const input_layer_2 = `
|  TAB |  \`  |  ~  |     |     | |              |     |  &  |  *  |  (  |  )  |  TAB |
| CTRL | CTRL |  $  |  %  |  ^  | |             |  -  |  =  |  [  |  ]  |  \  | CTRL |
| SHFT | SHFT |  !  |  @  |  #  | |             |  _  |  +  |  {  |  }  | "|" | SHFT |
| GUI |     | SPC |               | ENT |     | ALT |
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
  "": "&trans ",
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
};

function transformInput(input) {
  const lines = input.trim().split("\n");
  let output = `
/ {
        keymap {
                compatible = "zmk,keymap";

                default_layer {
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
      .filter((k) => k.length > 0);
    keys.forEach((key) => {
      output += keyMap[key] || `&kp ${key}   `;
    });
    output += "     ";
    output += "\n";
  });

  output += `>;
};
}`;

  return output;
}

const transformedOutput = transformInput(input_layer_0);
console.log(transformedOutput);
