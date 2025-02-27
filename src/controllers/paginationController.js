const getTickets = async (req, res) => {
    try {
      const { skip, limit } = req.pagination;
      const tickets = await Ticket.find({ userId: req.user.userId })
        .skip(skip)
        .limit(limit);
      res.json(tickets);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };