import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';


(async () => {
  main();
})();


function main() {

  const server = new Server({ //servidor de express
    port: envs.PORT,
  });

  const httpServer = createServer(server.app); //servidor del websocket
  WssService.initWss({ server: httpServer });

  server.setRoutes(AppRoutes.routes);

  httpServer.listen(envs.PORT, () => { //levantando el web socket
    console.log(`Server running on port: ${envs.PORT}`);
  })
}