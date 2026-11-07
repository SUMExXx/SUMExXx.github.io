'use client';
import type { BundledLanguage } from '@/components/ui/shadcn-io/code-block';
import {
	CodeBlock,
	CodeBlockBody,
	CodeBlockContent,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockFiles,
	CodeBlockHeader,
	CodeBlockItem,
	CodeBlockSelect,
	CodeBlockSelectContent,
	CodeBlockSelectItem,
	CodeBlockSelectTrigger,
	CodeBlockSelectValue,
} from '@/components/ui/shadcn-io/code-block';

const BlogCodeBlock = ({ code }: { code: { language: string; filename: string; code: string }[] }) => (
	<CodeBlock
		data={code}
		defaultValue={code[0].language}
		className="dark my-5 xl:w-full md:w-[calc(100vw-200px)] w-[calc(100vw-40px)] max-w-[760px] codeblock-scrollbar"
	>
		<CodeBlockHeader>
			<CodeBlockFiles>
				{(item) => (
					<CodeBlockFilename key={item.language} value={item.language}>
						{item.filename}
					</CodeBlockFilename>
				)}
			</CodeBlockFiles>
			<CodeBlockSelect>
				<CodeBlockSelectTrigger>
					<CodeBlockSelectValue />
				</CodeBlockSelectTrigger>
				<CodeBlockSelectContent>
					{(item) => (
						<CodeBlockSelectItem key={item.language} value={item.language}>
							{item.language}
						</CodeBlockSelectItem>
					)}
				</CodeBlockSelectContent>
			</CodeBlockSelect>
			<CodeBlockCopyButton
				onCopy={() => console.log('Copied code to clipboard')}
				onError={() => console.error('Failed to copy code to clipboard')}
			/>
		</CodeBlockHeader>
		<CodeBlockBody>
			{(item) => (
				<CodeBlockItem key={item.language} value={item.language}>
					<CodeBlockContent
						language={item.language as BundledLanguage}
						themes={{
							light: 'vitesse-light',
							dark: 'vitesse-dark',
						}}
					>
						{item.code}
					</CodeBlockContent>
				</CodeBlockItem>
			)}
		</CodeBlockBody>
	</CodeBlock>
);
export default BlogCodeBlock;
