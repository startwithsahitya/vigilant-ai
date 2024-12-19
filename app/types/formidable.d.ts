declare module 'formidable' {
    export interface File {
      newFilename: string;
      file: Buffer;
    }
  
    export class IncomingForm {
      parse(req: any, callback: (err: Error | null, fields: any, files: { [key: string]: File }) => void): void;
    }
  }
  