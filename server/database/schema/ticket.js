const mongoose = require('mongoose');


const TicketSchema = new mongoose.Schema({
    name: String,
    ticket: String,
    expires_in: Number,
    meta: {
        created: {
            type: Date,
            default: new Date()
        },
        updated: {
            type: Date,
            default: new Date()
        }
    }
})



TicketSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updatedAt = new Date();
    } else {
        this.meta.updateAt = new Date();
    }
    next();
})

TicketSchema.statics = {
    async getTicket() {
        let ticket = await this.findOne({
            name: 'access_ticket'
        }).exec();
        if (ticket && ticket.ticket) {
            ticket.access_ticket = ticket.ticket;
        }
        return ticket;
    },
    async saveTicket(data) {
        let ticket = await this.findOne({ name: 'ticket' }).exec();
        if (ticket) {
            ticket.ticket = data.access_ticket;
            ticket.expires_in = data.expires_in;
        } else {
            ticket = new Ticket({
                name: 'ticket',
                ticket: data.access_ticket,
                expires_in: data.expires_in
            })
        }
        await ticket.save((error, doc) => {
            if (error) {
                console.error(error);
                return false;
            }
            console.log('ticket更新成功');
        })
        return data;
    }
}

let Ticket = mongoose.model('Ticket', TicketSchema);