import {
  TransformationContext,
  transpileModule,
  ModuleKind,
  ScriptTarget,
  flattenDiagnosticMessageText,
  createProgram,
  Transformer,
  visitNode,
  CompilerOptions,
  SourceFile,
  Visitor,
  Node,
  VisitResult,
  visitEachChild,
  getPreEmitDiagnostics
} from "typescript";

class Test {
  public call(): void {
    console.log("AAAAAAAAAAAAAAAAAAAA   AA");
  }
}

/**
 * A simple compiler. EXEMPLE
 * @param fileNames 
 * @param options 
 */
function compile(fileNames: string[], options: CompilerOptions): void {
  let program = createProgram(fileNames, options);
  let emitResult = program.emit();

  let allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  );

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      let message = flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}



const source = "let x: string  = 'string'";

/**
 * A simpe transform. EXEMPLE
 */
let result = transpileModule(source, {
  compilerOptions: { module: ModuleKind.CommonJS }
});

console.log(JSON.stringify(result));



function tranformer(/*opt?: Opts*/) {
  function visitor(context: TransformationContext, sourceFile: SourceFile) {
    const visitor: Visitor = (node: Node): VisitResult<any> => {
      return visitEachChild(node, visitor, context);
    };
    return visitor;
  }
  return (context: TransformationContext): Transformer<any> => {
    return (source: SourceFile) => visitNode(source, visitor(context, source));
  };
}

const f = "sdd";

console.log("teste  2");

console.log("teste 2");

console.log("teste 3");

console.log("teste 4");

new Test().call();

console.log(process.argv)

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ScriptTarget.ES5,
  module: ModuleKind.CommonJS
});
