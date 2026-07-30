'use client';

function formatInline(text) {
  const nodes = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const raw = match[0];
    if (raw.startsWith('**')) {
      nodes.push(<strong key={last}>{raw.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={last}>{raw.slice(1, -1)}</em>);
    }
    last = regex.lastIndex;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

function formatBlock(block, idx) {
  const lines = block.split('\n');
  const listItems = lines.filter((line) => /^[-*]\s/.test(line.trim()));

  if (listItems.length === lines.length && lines.length > 0) {
    return (
      <ul key={idx} className="list-disc pl-4 space-y-0.5 my-1">
        {lines.map((line, i) => (
          <li key={i}>{formatInline(line.replace(/^[-*]\s+/, ''))}</li>
        ))}
      </ul>
    );
  }

  if (lines.length === 1) {
    return <p key={idx} className="m-0 leading-relaxed">{formatInline(block)}</p>;
  }

  return (
    <div key={idx} className="space-y-0.5">
      {lines.map((line, i) =>
        line.trim() === '' ? (
          <br key={i} />
        ) : (
          <p key={i} className="m-0 leading-relaxed">{formatInline(line)}</p>
        )
      )}
    </div>
  );
}

export function FormattedMessage({ content, className = '' }) {
  const blocks = content.split(/\n{2,}/);
  return (
    <div className={`${className}`}>
      {blocks.map((block, idx) => formatBlock(block, idx))}
    </div>
  );
}
