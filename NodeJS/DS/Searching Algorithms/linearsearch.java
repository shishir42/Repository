class LinearSearch
{
    // This function returns index of element x in arr[]
    static int search(int arr[], int n, int x)
    {
        for (int i = 0; i < n; i++)
        {
            // Return the index of the element if the element
            // is found
            if (arr[i] == x)
                return i;
        }

        // return -1 if the element is not found
        return -1;
    }
}


//Complete the following trainings
//https://app.pluralsight.com/library/courses/risk-management-information-systems-control-risk/table-of-contents
//https://app.pluralsight.com/library/courses/cissp-security-risk-management/table-of-contents
//https://app.pluralsight.com/library/courses/risk-vulnerabilities-threats-cnd/table-of-contents
//https://app.pluralsight.com/library/courses/threat-modeling-fundamentals/table-of-contents
//https://app.pluralsight.com/library/courses/enterprise-strength-mobile-device-security/table-of-contents
