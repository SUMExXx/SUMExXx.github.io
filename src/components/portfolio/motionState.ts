// Shared, mutable, non-React state: the WebGL loop reads it every frame, so routing it through
// React state would re-render the tree 60 times a second.
export const motionState = {
	scene: 0, // continuous shape index from the [data-scene] sections around the viewport centre
	velocity: 0, // smoothed scroll velocity (px/frame)
	pointerX: 9, // NDC -1..1 (9 = off-screen until the pointer moves)
	pointerY: 9,
};
