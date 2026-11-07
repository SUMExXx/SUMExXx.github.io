import { authorSumanDebnath, website } from '@/lib/data/website';
import { type FC } from 'react';
import BlogImage from '@/components/BlogImage';
import BlogParagraph from '@/components/BlogParagraph';
import BlogH2 from '@/components//BlogH2';
import BlogCodeInline from '@/components/BlogCodeInline';
import BlogUl from '@/components//BlogUl';
import BlogLi from '@/components//BlogLi';
import BlogCodeBlock from '../BlogCodeBlock';
import { type BlogMetadata } from '@/types';

export const Blog1Metadata: BlogMetadata = {
	title: 'Deploy any backend server to AWS ECS with auto-scaling',
	description:
		'Step-by-step guide to deploying any backend server to AWS ECS (Fargate or EC2) with auto-scaling. Learn containerization, task definitions, load balancing, scaling policies, and CI/CD best practices.',
	keywords: [
		'AWS',
		'ECS',
		'ECR',
		'Deploy to ECS',
		'Elastic Container Registry',
		'Deployment',
		'Backend',
		'Deployment Guide',
		'Auto-scaling',
		'Cloud Computing',
		'Server Deployment',
		'Infrastructure as Code',
		'DevOps',
		'Containerization',
		'Microservices',
		'Cloud Services',
		'AWS Services',
		'Scalable Applications',
	],
	authors: [authorSumanDebnath],
	publisher: authorSumanDebnath,
	publishedTime: new Date('2025-09-26'),
	modifiedTime: new Date('2025-09-26'),
	openGraph: {
		title: 'Deploy any backend server to AWS ECS with auto-scaling',
		description: 'Step-by-step guide to deploying any backend server to AWS ECS (Fargate or EC2) with auto-scaling.',
		url: `$${website.url}/blog/deploy-any-backend-server-to-aws-ecs-with-auto-scaling`,
		images: [{ url: `${website.url}/images/blogs/blog1/cover.png`, width: 1200, height: 630, alt: 'AWS ECS' }],
		siteName: 'SumanDebnath',
		type: 'article',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Deploy any backend server to AWS ECS with auto-scaling',
		description: 'Step-by-step guide to deploying any backend server to AWS ECS (Fargate or EC2) with auto-scaling.',
		images: [`${website.url}/images/blogs/blog1/cover.png`],
	},
};

const Blog1: FC = () => {
	return (
		<div className="mt-6 text-main-foreground/80">
			<BlogParagraph>
				Deploying a backend server to AWS ECS (Elastic Container Service) can be a complex task, but with the right steps,
				it can be accomplished efficiently. This guide will walk you through the process of deploying any backend server to
				AWS ECS, whether you&apos;re using Fargate or EC2, with auto-scaling capabilities which can be connected to your own
				domain.
			</BlogParagraph>

			<BlogH2>Setting up EC2 Security Group, ECR and IAM user for AWS CLI</BlogH2>

			<BlogUl>
				<BlogLi>
					Go to <BlogCodeInline>EC2 &gt; Security Groups &gt; Create security Group</BlogCodeInline> Provide it name like{' '}
					<i>backend-sg</i> and description. Add an Inbound rule: HTTP (80), Anywhere IPv4. Create security group.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758578619/profile-website/us-east-1.console.aws.amazon.com_ec2_home_region_us-east-1_ASUS_TUF_A15_Chrome_1_nf6dwz.png"
						alt="EC2 Security Group"
					/>
				</BlogLi>
				<BlogLi>
					Go to <BlogCodeInline>ECR &gt; Create repository</BlogCodeInline> Provide it a repo name like <i>sample/backend</i>{' '}
					where sample is a namespace and backend is the repo name. Keep other configurations to default and Create
					repository.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758579257/profile-website/us-east-1.console.aws.amazon.com_ecr_home_region_us-east-1_ASUS_TUF_A15_Chrome_yahad5.png"
						alt="ECR Repository"
					/>
				</BlogLi>
				<BlogLi>
					Go to <BlogCodeInline>IAM &gt; Create user</BlogCodeInline> Provide it a name like <i>ecr-push</i>. Check AWS
					Management console, uncheck reset password.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758695468/profile-website/us-east-1.console.aws.amazon.com_iam_home_region_us-east-1_ASUS_TUF_A15_Chrome_l5ixiy.png"
						alt="ECR Repository"
					/>
				</BlogLi>
				<BlogLi>
					Attach policies: <BlogCodeInline>AmazonEC2ContainerRegistryFullAccess</BlogCodeInline>,{' '}
					<BlogCodeInline>AmazonECS_FullAccess</BlogCodeInline>, <BlogCodeInline>AmazonS3FullAccess</BlogCodeInline>. Create
					user.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758695468/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_iam_home_region_us-east-1_ASUS_TUF_A15_Chrome_votik0.png"
						alt="ECR Repository"
					/>
				</BlogLi>
				<BlogLi>
					Next, click on the created user and Click on <i>Create access key</i> and note down the Access key ID and Secret
					access key. You will need these to configure AWS CLI.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758696138/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_iam_home_region_us-east-1_ASUS_TUF_A15_Chrome_2_vgk2nr.png"
						alt="ECR Repository"
					/>
				</BlogLi>
			</BlogUl>

			<BlogH2>Setting up sample Express.JS TypeScript backend, dockerizing and pushing it to ECR with AWS CLI</BlogH2>

			<BlogUl>
				<BlogLi>
					Open your project root folder in VS Code. Install Dev Containers VS Code Extension. Make sure you have already
					installed Docker Desktop on your PC and is running. Click <BlogCodeInline>CTRL + Shift + P</BlogCodeInline> and
					search for <i>Dev Containers: Add Dev Container configuration files</i>. Add configuration as per your backend tech
					stack. For ExpressJS TypeScript, I am using the configuration: Add configuration to workspace &gt; From a
					predefined container configuration template &gt; Node.js & Typescript &gt; 22-bookworm. It will create a{' '}
					<BlogCodeInline>.devcontainer</BlogCodeInline> folder in your project root with{' '}
					<BlogCodeInline>devcontainer.json</BlogCodeInline>. Add the below code to the devcontainer.json{' '}
					<BlogCodeBlock
						code={[
							{
								language: 'json',
								filename: 'devcontainer.json',
								code: `"runArgs": [
  "--privileged"
]`,
							},
						]}
					/>
					Now, click <BlogCodeInline>CTRL + Shift + P</BlogCodeInline> and search for{' '}
					<i>Dev Containers: Reopen in Container</i>. It will take some time to build the container and reopen the VS Code in
					the container.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758699757/profile-website/Screenshot_2025-09-24_131029_zlksrl.png"
						alt="VS Code Dev Container"
					/>
				</BlogLi>
				<BlogLi>
					Install Docker
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker $USER

sudo service docker start
sudo service docker status`,
							},
						]}
					/>
				</BlogLi>
				<BlogLi>
					Create a <BlogCodeInline>Dockerfile</BlogCodeInline> in the root of your project and set it up as per your backend
					tech stack. Below is a sample Dockerfile for ExpressJS TypeScript backend.
					<BlogCodeBlock
						code={[
							{
								language: 'dockerfile',
								filename: 'Dockerfile',
								code: `FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]`,
							},
						]}
					/>
				</BlogLi>
				<BlogLi>
					Now we need to install AWS CLI and configure it with the IAM user credentials. Run the below commands in the
					terminal to download AWS CLI. It will create a zip file in your root folder.
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: 'Dockerfile',
								code: `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"`,
							},
						]}
					/>
					Unzip the downloaded file with the below command. It will create a folder named <i>aws</i>
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `unzip awscliv2.zip`,
							},
						]}
					/>
					Install AWS CLI with the below command. Make sure the root project folder name does not have any spaces, else the
					command will fail.
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `sudo ./aws/install`,
							},
						]}
					/>
					Now you can delete both <BlogCodeInline>awscliv2.zip</BlogCodeInline> and <BlogCodeInline>aws</BlogCodeInline>{' '}
					folder. Configure AWS CLI with the below command. Provide the Access key ID, Secret access key, region (like
					us-east-1) and output format (like json).
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `mkdir ~/.aws

cat > ~/.aws/credentials <<EOF
[default]
aws_access_key_id=<YOUR_ACCESS_KEY_ID>
aws_secret_access_key=<YOUR_SECRET_ACCESS_KEY>
EOF

cat > ~/.aws/config <<EOF
[default]
region=<YOUR_AWS_REGION>
output=json
EOF
`,
							},
						]}
					/>
				</BlogLi>
				<BlogLi>
					Go to <BlogCodeInline>ECR &gt; Your repository &gt; View push Commands</BlogCodeInline>
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758745981/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ecr_repositories_private_684187848175_sample_backend_region_us-east-1_ASUS_TUF_A15_Chrome_idybov.png"
						alt="ECR Push Commands"
					/>
					Modify the 1st command and add <i>sudo</i> before docker command. Also add <i>sudo</i> before the rest of the
					commands. Run the below commands one by one to build your docker image and push it to ECR. Make sure to replace{' '}
					<i>&lt;YOUR_AWS_ACCOUNT_ID&gt;</i> and <i>&lt;YOUR_AWS_REGION&gt;</i> with your actual AWS account ID and region.
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `sudo aws ecr get-login-password --region <YOUR_AWS_REGION> | sudo docker login --username AWS --password-stdin <YOUR_AWS_ACCOUNT_ID>.dkr.ecr.<YOUR_AWS_REGION>.amazonaws.com`,
							},
						]}
					/>
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `sudo docker build -t sample/backend .

sudo docker tag sample/backend:latest 684187848175.dkr.ecr.us-east-1.amazonaws.com/sample/backend:latest

sudo docker push 684187848175.dkr.ecr.us-east-1.amazonaws.com/sample/backend:latest`,
							},
						]}
					/>
				</BlogLi>
			</BlogUl>

			<BlogH2>Setting up AWS ECS and deploying the backend server with auto-scaling</BlogH2>

			<BlogUl>
				<BlogLi>
					Go to <BlogCodeInline>ECS &gt; Clusters &gt; Create Cluster</BlogCodeInline>. Give it a name and select AWS Fargate
					and monitoring.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758785555/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ecs_v2_home_region_us-east-1_ASUS_TUF_A15_Chrome_pr6abm.png"
						alt="ECS Create Cluster"
					/>
				</BlogLi>
				<BlogLi>
					Next, we need to create a Task Definition. Go to{' '}
					<BlogCodeInline>ECS &gt; Task Definitions &gt; Create new Task Definition</BlogCodeInline>. Provide it a name,
					Select AWS Fargate. Set CPU and Memory as per your requirement. Select the created security group in the Network
					section. In Container-1 provide a name and click on <BlogCodeInline>Browse ECR Images</BlogCodeInline>. Choose your
					repository and select tag. Put Port mapping as 80 and protocol as TCP. Click on Add. Add a environment variable{' '}
					<BlogCodeInline>PORT 80</BlogCodeInline> Create the Task Definition. In health check, put{' '}
					<BlogCodeInline>CMD-SHELL, curl -f http://localhost:80/&lt;HEALTH_CHECK_ENDPOINT&gt; || exit 1</BlogCodeInline> and
					set the start period to 60 seconds.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758787004/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ecs_v2_clusters_region_us-east-1_ASUS_TUF_A15_Chrome_lrcfiq.png"
						alt="ECS Task Definition"
					/>
					Set the port mapping to 80 and protocol to TCP. Click on Add. Keep everything else as default. Create the Task
					Definition.
				</BlogLi>
				<BlogLi>
					Go to your ECS cluster, Create Service. Select task definition, revision latest, set security group as the one
					created earlier. Check <i>use the load balancer</i>. Set Application Load Balancer, create new load balancer. Give
					target group name and health check path. Keep everything else as default. Check service auto-scaling, set minimum
					capacity 1, maximum capacity 10 (or as per your choice). Set scaling policy to target tracking, set the metric type
					to <i>AWS/ECS, ServiceAverageCPUUtilization</i> and target value to 50. Create service.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758791220/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ecs_v2_clusters_backend-cluster_create-service_region_us-east-1_ASUS_TUF_A15_Chrome_poly9j.png"
						alt="ECS Task Definition"
					/>
					App will be deployed - click task and see public ip or you can go to{' '}
					<BlogCodeInline>EC2 &gt; Load Balancer &gt; The load balancer</BlogCodeInline> and get the DNS Name like{' '}
					<BlogCodeInline>backend-alb-1246242991.us-east-1.elb.amazonaws.com</BlogCodeInline> of the load balancer
				</BlogLi>
			</BlogUl>

			<BlogH2>Enabling HTTPS and Connecting custom domain to the backend server</BlogH2>

			<BlogParagraph>
				To enable HTTPS and connect your custom domain to the backend server deployed on AWS ECS, you can use AWS
				Certificate Manager (ACM) to obtain an SSL/TLS certificate and configure DNS settings with your domain provider (I
				am using Hostinger).
			</BlogParagraph>

			<BlogUl>
				<BlogLi>
					Now in order to make it accessible on HTTPS and connect a domain, put these CAA records in Hostinger
					<BlogCodeBlock
						code={[
							{
								language: 'bash',
								filename: '',
								code: `Name Flag Tag       CA Domain  TTL
@    0    issue     amazon.com 0
@    0    issuewild amazon.com 0`,
							},
						]}
					/>
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758793459/profile-website/hpanel.hostinger.com_domain_sumandebnath.site_dns_tab_dns_records_ASUS_TUF_A15_Chrome_aprdvw.png"
						alt="ECS Create Cluster"
					/>
				</BlogLi>
				<BlogLi>
					Go to <BlogCodeInline>Certificate Manager (ACM) &gt; Request &gt; Request public certificate</BlogCodeInline>. Add
					domain name (I am using <BlogCodeInline>backend.sumandebnath.site</BlogCodeInline>), dns verification, add the
					CNAME to your domain provider panel (I am using Hostinger) and Then submit. Wait for some time till it gets issued.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758794864/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_acm_home_region_us-east-1_ASUS_TUF_A15_Chrome_muppbb.png"
						alt="ECS ACM"
					/>
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758795537/profile-website/hpanel.hostinger.com_domain_sumandebnath.site_dns_tab_dns_records_ASUS_TUF_A15_Chrome_1_gsrcul.png"
						alt="Hostinger DNS Records"
					/>
				</BlogLi>
				<BlogLi>
					Next, Go to{' '}
					<BlogCodeInline>EC2 &gt; security groups &gt; edit security group &gt; Edit inbound rules</BlogCodeInline>. Add new
					rule HTTPS 443 (Anywhere IPv4). Then, go to <BlogCodeInline>EC2 &gt; Load Balancers</BlogCodeInline>. Select your
					load balancer and add a new listener, select HTTPS 443, select target group as earlier, set certificate source as{' '}
					<i>from ACM</i> select the certificate, keep everything else as default and add the listener.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758833921/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ec2_home_region_us-east-1_ASUS_TUF_A15_Chrome_z31vc1.png"
						alt="ALB"
					/>
				</BlogLi>
				<BlogLi>
					Now your app is set and you just need to connect it to your own domain as a subdomain, for that you can set up a A
					Record in your provider if you want to use the ALB IP Address or you can set the CNAME record that maps to the
					domain name of our ALB (recommended). For that go to
					<BlogCodeInline>EC2 &gt; Load Balancers &gt; Select your load balancer &gt; Copy the DNS name</BlogCodeInline> and
					add a CNAME record in your domain provider panel (I am using Hostinger): Put <i>name</i> as your desired subdomain
					and put <i>target</i> as the DNS.
					<BlogImage
						src="https://res.cloudinary.com/deeqsba43/image/upload/v1758791220/profile-website/684187848175-no75z2mw.us-east-1.console.aws.amazon.com_ecs_v2_clusters_backend-cluster_create-service_region_us-east-1_ASUS_TUF_A15_Chrome_poly9j.png"
						alt="ECS Task Definition"
					/>
				</BlogLi>
			</BlogUl>
			<BlogParagraph>
				Now, you can access your backend server on your custom domain with HTTPS enabled. You can access your backend as{' '}
				<BlogCodeInline>https://&gt;SUBDOMAIN&gt;.&gt;YOUR_DOMAIN&gt;</BlogCodeInline> like{' '}
				<BlogCodeInline>https://backend.sumandebnath.site</BlogCodeInline>.
			</BlogParagraph>
			<BlogImage
				src="https://res.cloudinary.com/deeqsba43/image/upload/v1758835282/profile-website/Screenshot_2025-09-26_025102_g5xqvs.png"
				alt="Backend on Custom Domain"
			/>
			<BlogParagraph>
				Now, each time you want to update your backend server, you just need to make the changes in your code, build the
				docker image, push it to ECR and then update the service in ECS to use the new image and force a new deployment. The
				auto-scaling will take care of scaling your service based on the CPU utilization.
			</BlogParagraph>
			<BlogParagraph>
				You can also set up CI/CD pipelines using AWS CodePipeline, GitHub Actions or other tools to automate the deployment
				process. I will update this blog with a comprehensive guide on setting up CI/CD with GitHub Actions so that each
				time you update your backend code and push to GitHub, a new ECR image will be automatically generated and deployed
				to ECS.
			</BlogParagraph>
			<BlogParagraph>
				This guide provides a comprehensive overview of deploying a backend server to AWS ECS with auto-scaling and
				connecting it to your own domain. Make sure to monitor your application and adjust scaling policies as needed to
				ensure optimal performance and cost-efficiency.
			</BlogParagraph>
			<BlogParagraph>
				Hope this blog was helpful to you. If you have any questions or need further assistance, feel free to leave a
				message below or reach out to me directly. Happy coding! 😊
			</BlogParagraph>
		</div>
	);
};

export default Blog1;
