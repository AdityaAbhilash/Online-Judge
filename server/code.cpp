#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  
  // Use vector instead of VLA
  vector<int> arr(n);
  
  for(int i = 0; i < n; i++) {
    cin >> arr[i];
  }

  int sum = 0;
  
  for(int i = 0; i < n; i++) {
    sum += arr[i];
  }

  cout << sum << endl;

  return 0;
}