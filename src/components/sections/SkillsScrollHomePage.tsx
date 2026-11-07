import { skills } from '@/lib/data/website';

const SkillsScrollHomePage = () => {
	return (
		<section className="relative w-full justify-center items-center bg-black overflow-hidden gap-[10px] md:p-[20px] p-[10px] flex flex-col flex-nowrap">
			<div className="flex justify-start items-center w-full gap-[10px] animate-infinite-scroll">
				{skills.map((item) => (
					<div
						key={crypto.randomUUID()}
						className="py-[10px] px-[16px] rounded-full outline-1 -outline-offset-1 outline-main-primary text text-white flex justify-center items-center"
					>
						{item}
					</div>
				))}
				{skills.map((item) => (
					<div
						key={crypto.randomUUID()}
						className="py-[10px] px-[16px] rounded-full outline-1 -outline-offset-1 outline-main-primary text text-white flex justify-center items-center"
					>
						{item}
					</div>
				))}
			</div>
			<div className="md:hidden flex justify-end items-center w-full gap-[10px] animate-infinite-scroll-reverse">
				{skills.map((item) => (
					<div
						key={crypto.randomUUID()}
						className="py-[10px] px-[16px] rounded-full outline-1 -outline-offset-1 outline-main-primary text text-white flex justify-center items-center"
					>
						{item}
					</div>
				))}
				{skills.map((item) => (
					<div
						key={crypto.randomUUID()}
						className="py-[10px] px-[16px] rounded-full outline-1 -outline-offset-1 outline-main-primary text text-white flex justify-center items-center"
					>
						{item}
					</div>
				))}
			</div>
		</section>
	);
};

export default SkillsScrollHomePage;
