import sys

def test(str):
    print(str + "success")
    sys.stdout.flush()

if __name__ == '__main__':
    test(sys.argv[1])



    