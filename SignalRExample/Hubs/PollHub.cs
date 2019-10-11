using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRExample.Hubs
{
    public class PollHub : Hub
    {
        public async Task SendMessage(string user, string message, string myLanguageId, string myLanguageVal)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, myLanguageId, myLanguageVal);
        }
    }
}
