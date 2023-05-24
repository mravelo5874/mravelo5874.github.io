export const acid_vertex = `
precision mediump float;
attribute vec2 a_pos;
varying vec2 v_pos;
void main()
{
    gl_Position = vec4(a_pos, 0.0, 1.0);
    v_pos = a_pos;
}
`;
export const acid_fragment = `
precision mediump float;
uniform sampler2D u_texture;
uniform float u_kernel[9];
uniform float u_time;
uniform vec2 u_res;
uniform bool u_step;
uniform bool u_pause;
varying vec2 v_pos;

float activation(float x)
{
    [AF]
}

void main()
{
    if (u_step && !u_pause)
    {
        vec2 position = gl_FragCoord.xy / u_res.xy;

        float sum = 
            texture2D(u_texture, (gl_FragCoord.xy + vec2( 1.0, -1.0)) / u_res.xy).r * u_kernel[0]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2( 0.0, -1.0)) / u_res.xy).r * u_kernel[1]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2(-1.0, -1.0)) / u_res.xy).r * u_kernel[2]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2( 1.0,  0.0)) / u_res.xy).r * u_kernel[3]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2( 0.0,  0.0)) / u_res.xy).r * u_kernel[4]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2(-1.0,  0.0)) / u_res.xy).r * u_kernel[5]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2( 1.0,  1.0)) / u_res.xy).r * u_kernel[6]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2( 0.0,  1.0)) / u_res.xy).r * u_kernel[7]
            + texture2D(u_texture, (gl_FragCoord.xy + vec2(-1.0,  1.0)) / u_res.xy).r * u_kernel[8];
        
        float x = activation(sum);
        gl_FragColor = vec4(x, x, x, 1.0) + (vec4(v_pos, length(v_pos), 1.0) * sin(u_time / 3000.0) * 0.2) + (vec4(length(v_pos), v_pos, 1.0) * cos(u_time / 1500.0) * 0.2);
    }
    else
    {
        gl_FragColor = texture2D(u_texture, (gl_FragCoord.xy) / u_res.xy).rgba;
    }
}
`;
//# sourceMappingURL=acid_shader.js.map