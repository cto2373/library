import subprocess

def git_clone():
    try:
        subprocess.run(["git", "clone", "https://github.com/cto2373/"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Git clone failed: {e}")
        raise SystemExit(1)
    
if __name__ == "__main__":
    git_clone()
    
    print("Deployment completed.")