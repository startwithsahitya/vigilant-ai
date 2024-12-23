import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../lib/mysql'; // Import query from mysql.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { testId } = req.query;

        if (!testId) {
            return res.status(400).json({ message: 'Test ID is required.' });
        }

        try {
            // Fetch the results for the given test ID
            const results = await query(`
                SELECT s.name, tr.score
                FROM test_results tr
                JOIN students s ON tr.student_id = s.id
                WHERE tr.test_id = ?`, [testId]);

            res.status(200).json({ results });
        } catch (error) {
            console.error('Error fetching test results:', error);
            res.status(500).json({ message: 'An error occurred while fetching test results.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
