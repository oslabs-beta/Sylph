import { generateContextBridge } from './IPC/General/contextBridge';

import project from './IPC/Project';
import app from './IPC/App';

generateContextBridge([project, app]);
