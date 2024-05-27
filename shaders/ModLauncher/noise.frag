#pragma header

uniform float u_size;

uniform float u_time;
uniform float u_mix;

float hash_1_3(vec3 v) {
	v = fract(v * 0.103107);
	v += dot(v, v.zyx + 31.329583);
	return fract((v.x + v.y) * v.z);
}

void main() {
	vec4 tex = flixel_texture2D(bitmap, openfl_TextureCoordv);
	float noise = hash_1_3(vec3(
		floor(openfl_TextureCoordv * openfl_TextureSize * u_size) / u_size,
		u_time / 1e3
	)) * 2.0 - 1.0;
	
	gl_FragColor = vec4(tex.rgb - noise * (u_mix / 1e1), tex.a);
}