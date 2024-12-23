import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/mysql'; // Import the query function from mysql.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { testId } = req.query;

        if (!testId) {
            return res.status(400).json({ message: 'Test ID is required.' });
        }

        try {
            // Fetch the test questions for the given test ID
            const questions = await query('SELECT id, text, correct_answer FROM questions WHERE test_id = ?', [testId]);

            res.status(200).json({ questions });
        } catch (error) {
            console.error('Error fetching test questions:', error);
            res.status(500).json({ message: 'An error occurred while fetching test questions.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
