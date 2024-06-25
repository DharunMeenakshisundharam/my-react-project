import { connect, Schema, model } from 'mongoose';  // Connecting MongoDB
import express, { json } from 'express'; // Connecting Express
import cors from 'cors'; // Connecting Cross-Origin
const app = express();
const port = process.env.PORT || 5173; // Change the port number here

// Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials
const dbURI = 'mongodb+srv://dharunsundharam:vN5q7VVgYGhJNMpC@cluster0.ht9m2wx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas:', err);
    });

const DBSchema = new Schema({
    todo: { type: String, required: true },
});

const DBModel = model('Todo', DBSchema);

app.use(json());
app.use(cors());

app.post('/posting', async (req, resp) => {
    try {
        const user = new DBModel(req.body);
        const results = await user.save();
        const datasending = results.toObject();
        resp.send(datasending);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Something Went Wrong');
    }
});

app.get('/getting', async (req, resp) => {
    try {
        const users = await DBModel.find({}, 'todo');
        resp.json(users);
    } catch (e) {
        console.error(e);
        resp.status(500).send('Failed to retrieve user data');
    }
});

app.put('/updating/:id', async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;

    try {
        const updatedTodo = await DBModel.findByIdAndUpdate(
            id,
            { todo },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).send('Todo not found');
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Failed to update todo:', error);
        res.status(500).send('Failed to update todo');
    }
});

app.delete('/deleting/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const result = await DBModel.findByIdAndDelete(id);

        if (!result) {
            return resp.status(404).send('Todo not found');
        }

        resp.send('Todo deleted successfully');
    } catch (e) {
        console.error(e);
        resp.status(500).send('Failed to delete todo');
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});