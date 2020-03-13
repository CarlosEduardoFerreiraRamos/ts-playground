import {TransformationContext,Transformer,visitNode, SourceFile,Visitor, Node, VisitResult, visitEachChild} from 'typescript';

class Test {
    public call(): void {
        console.log('AAAAAAAAAAAAAAAAAAAA   AA')
    }
}

function tranformer(/*opt?: Opts*/) {
    function visitor(context: TransformationContext, sourceFile: SourceFile ) {
        const visitor: Visitor = (node: Node): VisitResult<any> => {
            return visitEachChild(node, visitor, context);
        }
        return visitor;
    }
    return (context: TransformationContext) : Transformer<any> => {
        return (source: SourceFile) => visitNode(source, visitor(context, source))
    }
}

const f = 'sdd';

console.log('teste  2')

console.log('teste 2')

console.log('teste 3')

console.log('teste 4')


new Test().call()



