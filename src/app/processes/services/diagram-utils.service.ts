import { Observable } from 'rxjs';

export const importDiagram = (bpmnJS) => <Object>(source: Observable<string>) =>
  new Observable<string>(observer => {

    const subscription = source.subscribe({
      async next(xml: string) {

        subscription.unsubscribe();

        try {
          const result = await bpmnJS.importXML(xml);
          const { warnings } = result;
          // console.log(warnings);
        } catch (err) {
          console.log(err.message, err.warnings);
        }

        // bpmnJS.importXML(xml, function(err, warnings) {

        //   if (err) {
        //     observer.error(err);
        //   } else {
        //     observer.next(warnings);
        //   }

        //   observer.complete();
        // });
      },
      error(e) {
        console.log('ERROR');
        observer.error(e);
      },
      complete() {
        observer.complete();
      }
    });
  });
