interface SpacerProps {
	height?: string;
	maxHeight?: string;
	minHeight?: string;
}

const Spacer = ({ height = '20px', maxHeight, minHeight }: SpacerProps) => (
	<div style={{ width: '100%', height, maxHeight, minHeight }} />
);

export default Spacer;
