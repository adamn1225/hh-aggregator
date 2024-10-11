import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { getTasksDueNow } from './lib/database';
import { Task } from './lib/schema'; // Import the Task type

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Email options
const createMailOptions = (to: string, task: string) => ({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Task Reminder',
    text: `You have a task due today: ${task}`,
});

// Cron job to check for tasks due now every minute
cron.schedule('* * * * *', async () => {
    console.log('Checking for due tasks...');
    const tasks: Task[] = await getTasksDueNow();

    tasks.forEach(async (task: Task) => {
        if (task.task && task.user_id) { // Ensure task and user_id are not null
            const mailOptions = createMailOptions(task.user_id, task.task); // Assuming user_id is the email
            try {
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to ${task.user_id} for task: ${task.task}`);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        } else {
            console.error('Task or user_id is null, skipping email.');
        }
    });
});

export { }; // Add this line to make the file a module