'use client';
import { useState } from 'react';
import { socials } from '@/lib/data/website';

const SendMessage = () => {
	const [emailStatus, setEmailStatus] = useState<boolean>(true);
	const [messageStatus, setMessageStatus] = useState<boolean>(true);

	const handleEmailFocus = () => {
		if (emailStatus) {
			setEmailValue('');
			setEmailStatus(false);
		}
	};

	const handleMessageFocus = () => {
		if (messageStatus) {
			setMessageValue('');
			setMessageStatus(false);
		}
	};

	const [emailValue, setEmailValue] = useState<string>('Enter your Email');

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailValue(e.target.value);
	};

	const [messageValue, setMessageValue] = useState<string>('Type your Message');

	const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		console.log(messageValue);
		setMessageValue(e.target.value);
	};

	const [messageLoadingState, setMessageLoadingState] = useState<boolean>(false);

	const sendMessage = async () => {
		setMessageLoadingState(true);

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (messageValue == '' || messageValue == 'Type your Message') {
			setMessageLoadingState(false);
			return alert('Message is empty. Write a message before sending.');
		} else if (messageValue.length < 10) {
			setMessageLoadingState(false);
			return alert('Message is too small. Write more.');
		} else if (emailValue == '' || emailValue == 'Enter your Email') {
			setMessageLoadingState(false);
			return alert('Enter your email.');
		} else if (!emailRegex.test(emailValue)) {
			setMessageLoadingState(false);
			return alert('Not a valid email address');
		}

		// No server on GitHub Pages: hand the message to the visitor's mail client.
		const subject = encodeURIComponent(`${emailValue} contacted through Profile Website`);
		const body = encodeURIComponent(messageValue);
		window.location.href = `${socials.email}?subject=${subject}&body=${body}`;
		setMessageLoadingState(false);
	};

	return (
		<div className="flex flex-col h-full justify-between items-end gap-[20px]">
			<div
				className="md:h-[298px] h-[230px] md:w-[413px] w-[320px] flex flex-col md:p-[20px] p-[20px] md:gap-[20px] gap-[20px]"
				style={{
					backgroundImage: "url('/images/footerMessageElement.png')",
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div className="w-full">
					<label htmlFor="email" className="hidden">
						Email:
					</label>
					<input
						id="email"
						type="text"
						value={emailValue}
						onFocus={handleEmailFocus}
						onChange={handleEmailChange}
						className="border p-2 w-full text-main-background bg-main-foreground text-bold"
						maxLength={50} // limit the length of the input
					/>
				</div>
				<div className="w-full h-full">
					<label htmlFor="message" className="hidden">
						Message
					</label>
					<textarea
						id="message"
						value={messageValue}
						onChange={handleMessageChange}
						onFocus={handleMessageFocus}
						className="border p-2 w-full text-main-background bg-main-foreground text-bold md:max-h-[196px] max-h-[129px] md:min-h-[196px] min-h-[129px] max-w-full"
						maxLength={200} // limit the length of the input
					/>
				</div>
			</div>
			<button
				onClick={sendMessage}
				className="subtitle text-main-foreground flex justify-center items-center text-center right-[360px] top-[-16px] md:w-[273.41px] md:h-[52.41px] w-[127px] h-[25px] transition-all duration-300 ease-in-out hover:filter hover:brightness-125 cursor-pointer"
				style={{
					backgroundImage: "url('/images/leftSkillVector.png')",
					backgroundSize: 'contain',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{messageLoadingState === false ? (
					'Send Message'
				) : (
					<div role="status">
						<svg
							aria-hidden="true"
							className="w-4 h-4 me-2 text-main-foreground animate-spin dark:text-gray-600 fill-main-tertiary"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="currentColor"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentFill"
							/>
						</svg>
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</button>
		</div>
	);
};

export default SendMessage;
