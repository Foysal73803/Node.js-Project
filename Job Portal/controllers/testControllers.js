export const testControllers = (req, res) => {
    const {name} = req.body;
    res.send(`Your Name Is ${name}`);
};