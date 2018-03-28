const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  name: String,
  ticket: String,
  expires_in: Number,
  meta: {
    created: {
      type: Date,
      default: Date.now()
    },
    updated: {
      type: Date,
      default: Date.now()
    }
  }
});

TicketSchema.pre("save", function(next) {
  console.log(this, this.isNew);
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});

TicketSchema.statics = {
  async getTicket() {
    let ticket = await this.findOne({
      name: "ticket"
    }).exec();
    return ticket;
  },
  async saveTicket(data) {
    let ticket = await this.findOne({ name: "ticket" }).exec();
    if (ticket) {
      ticket.ticket = data.ticket;
      ticket.expires_in = data.expires_in;
    } else {
      ticket = new Ticket({
        name: "ticket",
        ticket: data.ticket,
        expires_in: data.expires_in
      });
      console.log("ticket更新成功");
    }
    await ticket.save((error, doc) => {
      if (error) {
        console.error(error);
        return false;
      }
    });
    return data;
  }
};

let Ticket = mongoose.model("Ticket", TicketSchema);
